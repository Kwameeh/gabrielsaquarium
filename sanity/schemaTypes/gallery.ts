import { defineField, defineType } from 'sanity';

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'mediaType',
      title: 'Media type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== 'image',
      validation: (r) =>
        r.custom((value, context) => {
          const parent = context.parent as { mediaType?: string };
          if (parent?.mediaType === 'image' && !value) return 'Image is required';
          return true;
        }),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'External video (YouTube, Vimeo, etc.)',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video file',
      type: 'file',
      options: { accept: 'video/mp4,video/webm' },
      description: 'Self-hosted video (mp4 or webm)',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail image',
      type: 'image',
      options: { hotspot: true },
      description: 'Poster / thumbnail for videos',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
        list: [
          { title: 'Tanks', value: 'tanks' },
          { title: 'Fish', value: 'fish' },
          { title: 'Custom Builds', value: 'custom-builds' },
          { title: 'Marine', value: 'marine' },
          { title: 'Freshwater', value: 'freshwater' },
          { title: 'Installation', value: 'installation' },
          { title: 'Maintenance', value: 'maintenance' },
          { title: 'Behind the Scenes', value: 'behind-the-scenes' },
        ],
      },
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'showOnHome',
      title: 'Show on home page gallery',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'showInHero',
      title: 'Show in hero section',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      type: 'number',
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'mediaType',
      imageMedia: 'image',
      thumbnailMedia: 'thumbnailImage',
    },
    prepare({ title, subtitle, imageMedia, thumbnailMedia }) {
      return {
        title: title ?? 'Untitled',
        subtitle: subtitle === 'video' ? '🎬 Video' : '🖼️ Image',
        media: imageMedia ?? thumbnailMedia,
      };
    },
  },
});
