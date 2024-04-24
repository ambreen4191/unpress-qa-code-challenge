'use client'

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, TextField, Button } from '@mui/material';

const MAX_NAME_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 200;
const MAX_VIDEO_DURATION = 600;
const MAX_VIDEO_SIZE = 100000000;

const schema = yup.object().shape({
    name: yup.string().required('Video name is required').max(MAX_NAME_LENGTH, `Video name must be at most ${MAX_NAME_LENGTH} characters`),
    description: yup.string().required('Video description is required').max(MAX_DESCRIPTION_LENGTH, `Video description must be at most ${MAX_DESCRIPTION_LENGTH} characters`),
    video: yup
        .mixed()
        .required('Please upload the video')
        .test('fileSize', 'Video size is too large', (value) => {
            if (!value || !value[0]) return false;
            return value[0].size <= MAX_VIDEO_SIZE;
        })
        .test('fileType', 'Invalid video format', (value) => {
            if (!value || !value[0]) return false;
            return value[0].type.startsWith('video/');
        }),
});

interface IHomeSubmitData {
    name: string;
    description: string;
    video: FileList | null | undefined;
    duration?: number;
}

export default function Home() {
    const { register, handleSubmit, formState: { errors } } = useForm<IHomeSubmitData>({
        resolver: yupResolver(schema) as any,
    });

    const onSubmit: SubmitHandler<IHomeSubmitData> = (data) => {
        console.log(data);
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register('name')}
                    label="Video Name"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
                <TextField
                    {...register('description')}
                    label="Video Description"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    className='mt-10'
                />
                <TextField
                    {...register('video')}
                    type="file"
                    fullWidth
                    error={!!errors.video}
                    helperText={errors.video?.message}
                    className='my-10'
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Create Video
                </Button>
            </form>
        </Container>
    );
}
