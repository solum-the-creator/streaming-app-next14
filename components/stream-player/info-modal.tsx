'use client';

import { useState, useTransition, useRef, ElementRef } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { updateStream } from '@/actions/stream';
import { toast } from 'sonner';

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}

export const InfoModal = ({
  initialName,
  initialThumbnailUrl,
}: InfoModalProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null);
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(initialName);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast.success('Stream updated');
          closeRef?.current?.click();
        })
        .catch(() => toast.error('Something went wrong'));
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'link'} size={'sm'} className='ml-auto'>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className='space-y-14'>
          <div className='space-y-2'>
            <Label>Name</Label>
            <Input
              placeholder='Stream name'
              onChange={onChange}
              value={name}
              disabled={isPending}
            />
          </div>
          <div className='flex justify-between'>
            <DialogClose ref={closeRef} asChild>
              <Button type='button' variant={'ghost'}>
                Cancel
              </Button>
            </DialogClose>
            <Button variant={'primary'} type='submit' disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
