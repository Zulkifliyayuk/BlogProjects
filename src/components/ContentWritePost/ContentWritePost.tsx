import React, { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { InputGroup } from '../InputGroup/InputGroup';
import { Button } from '../Button/Button';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePostBlog } from '@/services/hooks/usePostBlog';
import TextEditor from '../TextEditor/TextEditor';
import { useAppSelector } from '@/redux/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { adjustClamp } from '@/layout/function/function';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png'];

const schema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(100, 'Title must be at most 100 characters'),

  content: z
    .string()
    .trim()
    .min(1, 'Content is required')
    .max(2000, 'Content must be at most 2000 characters'),

  tags: z
    .array(z.string().trim().min(1, 'Tag cannot be empty'))
    .min(1, 'At least one tag is required'),

  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_IMAGE_SIZE, {
      message: 'Image must be less than 5MB',
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Image must be a JPG or PNG',
    })
    .nullable(),
});

type FormData = z.infer<typeof schema>;

const defaultValues: FormData = {
  title: '',
  content: '',
  tags: [],
  image: null,
};

export const ContentWritePost: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();

  if (!token) {
    navigate('/Home');
  }

  const { mutate } = usePostBlog();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = ({ title, tags, content, image }: FormData) => {
    const postData = new FormData();

    postData.append('title', title);
    postData.append('content', content);
    tags.forEach((tag) => postData.append('tags', tag));
    if (image) {
      postData.append('image', image);
    }

    mutate(postData);
    reset(defaultValues);
    handleDeleteImage();
    navigate('/Home');
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      imageField.onChange(file);
    }
  };

  const handleDeleteImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // delete from memory
    }

    setSelectedImage(null);
    setPreviewUrl(undefined);
    imageField.onChange(null);

    // delete input file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleChangeTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.trim();
    if (e.key === ' ' || e.key === ',' || e.key === 'Enter') {
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
        tagsField.onChange([...tags, value]);
      }
      (e.target as HTMLInputElement).value = '';
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    }
  };

  const handleDeleteTag = (index: number) => () => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    tagsField.onChange(newTags);
  };

  const { field: titleField } = useController({
    name: 'title',
    control,
  });
  const { field: tagsField } = useController({
    name: 'tags',
    control,
  });

  const { field: contentField } = useController({
    name: 'content',
    control,
  });

  const { field: imageField } = useController({
    name: 'image',
    control,
  });

  useEffect(() => {
    if (!selectedImage) return;
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedImage]);

  return (
    <div className='mx-auto my-0 w-[782px] px-[24px] py-4 md:py-[48px]'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-center gap-[20px]'
      >
        <InputGroup errorMessage={errors.title?.message}>
          <label
            htmlFor='title'
            className='items-center text-sm leading-7 font-semibold text-neutral-950'
          >
            Title
          </label>
          <div
            className={cn(
              'mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2.5',
              errors.title?.message && 'border-[#EE1D52]'
            )}
          >
            <input
              type='text'
              id='title'
              placeholder='Enter your title'
              {...titleField}
              className='font-regular w-full border-none text-sm leading-6 text-neutral-500 outline-none'
            />
          </div>
        </InputGroup>

        <InputGroup errorMessage={errors.content?.message}>
          <label
            htmlFor='content'
            className='items-center text-sm leading-7 font-semibold text-neutral-950'
          >
            Content
          </label>
          <TextEditor
            {...contentField}
            className='mt-1.5'
            errorMessage={errors.content?.message}
          />
        </InputGroup>

        <InputGroup errorMessage={errors.image?.message}>
          <label
            htmlFor='image'
            className='items-center text-sm leading-7 font-semibold text-neutral-950'
          >
            Cover Image
          </label>
          <div
            className={cn(
              'relative mt-1.5 flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-400 bg-neutral-50 px-[24px] py-[16px]',
              errors.image?.message && 'border-[#EE1D52]'
            )}
          >
            {previewUrl && (
              <>
                <img
                  src={previewUrl}
                  alt='Background Image Blog'
                  className='h-auto object-cover pb-[12px]'
                  style={{ width: adjustClamp(313, 529, 1440) }}
                />

                <div className='flex flex-row gap-3'>
                  <div
                    className='font-regular inline-flex cursor-pointer items-center gap-[4px] rounded-lg border border-neutral-300 px-[12px] py-[6px] text-sm leading-7 text-neutral-950 hover:text-neutral-950/70'
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <img
                      src='./src/assets/PhaseArrowChange.png'
                      alt='change image icon'
                      className='size-[20px]'
                    />
                    Change Image
                  </div>
                  <div
                    className='font-regular inline-flex cursor-pointer items-center gap-[4px] rounded-lg border border-neutral-300 px-[12px] py-[6px] text-sm leading-7 text-[#EE1D52] hover:text-[#EE1D52]/70'
                    onClick={handleDeleteImage}
                  >
                    <img
                      src='./src/assets/PhaseArrowDelete.png'
                      alt='change image icon'
                      className='size-[20px]'
                    />
                    Delete Image
                  </div>
                </div>
              </>
            )}

            <div
              className={cn(
                'cursor-pointer rounded-md border border-neutral-300 p-[10px]',
                previewUrl && 'hidden'
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src='./src/assets/uploadcloud.png'
                alt='Upload'
                className='size-[20px]'
              />
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleImageChange}
              />
            </div>
            <div
              className={cn(
                'mt-[12px] text-sm leading-7 text-neutral-700',
                previewUrl && 'hidden'
              )}
            >
              <span
                className='text-primary-300 hover:text-primary-300/70 cursor-pointer font-semibold'
                onClick={() => fileInputRef.current?.click()}
              >
                Click to upload
              </span>{' '}
              <span className='font-regular'>or drag and drop</span>
            </div>
            <p className='font-regular mt-1 text-xs leading-6 text-neutral-700'>
              PNG or JPG (max. 5mb)
            </p>
          </div>
        </InputGroup>

        <InputGroup errorMessage={errors.tags?.message}>
          <label
            htmlFor='tags'
            className='items-center text-sm leading-7 font-semibold text-neutral-950'
          >
            Tags
          </label>
          <div
            className={cn(
              'mt-1 flex w-full flex-row flex-wrap gap-[8px] rounded-xl border border-neutral-300 px-4 py-2.5',
              errors.tags?.message && 'border-[#EE1D52]'
            )}
          >
            {tags.map((tag, index) => (
              <div
                key={index}
                className='font-regular inline-flex items-center gap-[8px] rounded-[8px] border border-neutral-300 px-2 text-xs leading-6'
              >
                {tag}
                <img
                  src='./src/assets/Xicon.png'
                  alt='X'
                  className='size-[12px] cursor-pointer'
                  onClick={handleDeleteTag(index)}
                />
              </div>
            ))}
            <input
              type='text'
              id='tags'
              onKeyDown={handleChangeTags}
              placeholder='Enter your tags'
              className='font-regular w-full flex-1 border-none text-sm leading-6 text-neutral-500 outline-none'
            />
            <input {...tagsField} className='hidden'></input>
          </div>
        </InputGroup>

        <div className='flex w-full justify-end'>
          <Button
            variant='primary'
            type='submit'
            className='w-full md:w-[265px]'
          >
            Finish
          </Button>
        </div>
      </form>
    </div>
  );
};
