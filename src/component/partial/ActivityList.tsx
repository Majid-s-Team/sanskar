import { CloseCircleOutlined } from "@ant-design/icons";

type Options = {
  label: string;
  value: string;
};

export const ActivityList = ({
  activityList,
  onUnSelect,
  title,
}: {
  activityList: Options[];
  onUnSelect: (item: string) => void;
  title: string;
}) => (
  <div>
    {activityList.length > 0 && (
      <p className="text-[18px] medium mb-2">{title}</p>
    )}
    <div className="flex flex-wrap gap-2">
      {activityList.map((item, index) => (
        <div
          className="flex items-center gap-3 p-2 text-white bg-[#D57D25] rounded-[8px]"
          key={index}
        >
          <p className="text-[12px] regular capitalize">{item.label}</p>
          <CloseCircleOutlined
            size={5}
            onClick={() => onUnSelect(item.value)}
          />
        </div>
      ))}
    </div>
  </div>
);
