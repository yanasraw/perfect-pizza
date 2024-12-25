'use client';
import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Api } from '@/shared/services/api-client';
import { IStory } from '@/shared/services/stories';
import { Container } from './container';
import { StorySkeleton } from './story-skeleton';
import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = React.useState<IStory[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<IStory>();

  React.useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);
    if (story.items.length > 0) {
      setOpen(true);
    }
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  return (
    <>
      <Container className={cn('flex items-center justify-between gap-2 my-10', className)}>
        {stories?.length === 0 && [...Array(5)].map((_, index) => <StorySkeleton key={index} />)}

        {stories?.length > 0 && (
          <Carousel
            responsive={responsive}
            pauseOnHover
            arrows
            autoPlay
            autoPlaySpeed={2500}
            draggable={false}
            infinite={true}
            keyBoardControl={true}
            containerClass="carousel-container w-full"
            itemClass="basis-1/5"
          >
            {stories.map((story) => (
              <div className="flex justify-center" key={story.id}>
                <img
                  onClick={() => onClickStory(story)}
                  className="w-[222px] h-[300px] rounded-sm cursor-pointer select-none"
                  src={story.previewImageUrl}
                />
              </div>
            ))}
          </Carousel>
        )}

        {open && (
          <div className="fixed inset-0 h-lvh w-lvw bg-black/80 flex items-center justify-center z-50">
            <div className="relative" style={{ width: 520 }}>
              <button className="absolute -right-10 -top-5 z-30" onClick={() => setOpen(false)}>
                <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
              </button>

              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
                defaultInterval={3000}
                width={520}
                height={800}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
