import { Pagination, Select } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useRequest } from "../hooks";
import AudioPlayer from "../component/shared/AudioPlayer";
import { optionpPicker } from "../helper";
import { useEffect, useRef, useState } from "react";

function GurukulPrayers() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const handlePlay = (index: number) => {
    // Pause all other tracks
    audioRefs.current.forEach((audio, i) => {
      if (i !== index && audio) audio.pause();
    });
    setActiveIndex(index);
  };

  const handleEnded = (index: number) => {
    // Play next track automatically
    const nextIndex = index + 1;
    if (nextIndex < data.length && audioRefs.current[nextIndex]) {
      audioRefs.current[nextIndex]?.play();
      setActiveIndex(nextIndex);
    }
  };

  const { data, loading, pagination, onPaginationChange, execute } =
    useRequest<any>("/gurukal-prayers", "GET", {
      type: "mount",
      params: { category_id: selectedCategory },
    });

  const { data: prayerCategories, loading: prayerCategoriesLoading } =
    useRequest("/gurukal-prayer-categories", "GET", {
      type: "mount",
    });

  useEffect(() => {
    execute({});
  }, [selectedCategory]);

  useEffect(() => {
    audioRefs.current.forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    setActiveIndex(null);
  }, [data]);

  return (
    <HomeLayout loading={loading}>
      <div className="bg-white p-5 rounded-[24.59px]">
        <div className="flex lg:flex-row flex-col gap-5 justify-between lg:items-center">
          <p className="text-[40px] semibold">Gurukul Prayers</p>
          <div className="flex gap-5 items-center">
            <Select
              loading={prayerCategoriesLoading}
              value={selectedCategory}
              onChange={(value) => {
                setSelectedCategory(value);
              }}
              onClear={() => window.location.reload()}
              allowClear
              placeholder="Select Prayer Category"
              className="min-w-[200px]"
              options={optionpPicker(prayerCategories as any)}
            />
          </div>
        </div>
        {data?.length === 0 ? (
          <p className="text-[24px] semibold capitalize text-center my-10">
            No prayers available.
          </p>
        ) : (
          <>
            <div className="grid lg:grid-cols-2 gap-5 p-5 mt-5">
              {data?.map((item: any, index: number) => {
                // if (!item?.url?.endsWith(".mp3")) return null;
                return (
                  <div key={index} className="space-y-3">
                    <p className="text-[24px] font-semibold capitalize">
                      {item.text}
                    </p>
                    <AudioPlayer
                      ref={(el: any) => (audioRefs.current[index] = el)}
                      url={item.url}
                      isActive={activeIndex === index}
                      onPlay={() => handlePlay(index)}
                      onEnded={() => handleEnded(index)}
                    />
                  </div>
                );
              })}
            </div>
            <Pagination
              onChange={(page: number, pageSize: number) =>
                onPaginationChange({ current: page, pageSize })
              }
              {...pagination}
              className="mt-5 flex justify-end"
            />
          </>
        )}
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(GurukulPrayers);
