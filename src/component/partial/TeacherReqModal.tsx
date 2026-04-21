import { Modal, Image } from "antd";
import dayjs from "dayjs";

function DetailItem({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="medium">{title}</span>
      <span className="regular capitalize">{value || "-"}</span>
    </div>
  );
}

function TeacherReqModal({ open, onClose, record }: any) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Request Detail"
      centered
    >
      <div className="flex flex-col justify-center">
        {/* Teacher Absent Request */}
        {record?.absent && (
          <div className="space-y-4 text-[15px] my-5">
            <DetailItem
              title="Teacher Name"
              value={record?.teacher?.full_name}
            />
            <DetailItem
              title="Email"
              value={record?.teacher?.user?.primary_email}
            />
            <DetailItem title="Phone" value={record?.teacher?.phone_number} />

            <DetailItem
              title="From Date"
              value={dayjs(record?.absent?.from_date).format("MM-DD-YYYY")}
            />

            <DetailItem
              title="To Date"
              value={dayjs(record?.absent?.to_date).format("MM-DD-YYYY")}
            />

            <DetailItem
              title="Date of Request"
              value={dayjs(record?.created_at).format("MM-DD-YYYY")}
            />

            <div className="border-b pb-2">
              <p className="medium">Reason</p>
              <p className="regular">{record?.absent?.absence_reason || "-"}</p>
            </div>
          </div>
        )}

        {/* Fuel Request */}
        {record?.fuel && (
          <div className="space-y-4 text-[15px] my-5">
            <DetailItem title="Name" value={record?.fuel?.name} />
            <DetailItem
              title="Cheque Payable To"
              value={record?.fuel?.cheque_payable_to}
            />
            <DetailItem
              title="Date"
              value={dayjs(record?.fuel?.date).format("MM-DD-YYYY")}
            />
            <DetailItem title="Address" value={record?.fuel?.address} />
            <DetailItem title="City" value={record?.fuel?.city_state_zip} />
            <DetailItem title="Phone" value={record?.fuel?.phone_number} />

            {/* Fuel Items */}
            <div className="border-b pb-2">
              <p className="medium mb-2">Items</p>

              {record?.fuel?.items?.map((item: any) => (
                <div
                  key={item.id}
                  className="flex justify-between regular mb-1"
                >
                  <span>{item.item_name}</span>
                  <span>${item.amount}</span>
                </div>
              ))}
            </div>

            {/* Receipt */}
            <div className="border-b pb-2">
              <p className="medium">Receipt</p>
              {record?.fuel?.receipts.length === 0 && (
                <p className="regular mt-2">No Receipt</p>
              )}
              {record?.fuel?.receipts.map((item: any) => (
                <Image.PreviewGroup key={item.id}>
                  <Image
                    key={item.id}
                    src={item.file_path}
                    alt="receipt"
                    className="!w-32 mt-2 rounded"
                  />
                </Image.PreviewGroup>
              ))}
            </div>
          </div>
        )}

        {/* Arts & Craft Request */}
        {record?.arts_craft && (
          <div className="space-y-4 text-[15px] my-5">
            <DetailItem
              title="Class Name"
              value={record?.arts_craft?.class_name}
            />
            <DetailItem
              title="Craft Need"
              value={record?.arts_craft?.craft_need}
            />
            <DetailItem
              title="Students Count"
              value={record?.arts_craft?.students_count}
            />
            <DetailItem title="Grade" value={record?.arts_craft?.grade} />

            <DetailItem title="Sevak 1" value={record?.arts_craft?.sevak} />
            <DetailItem title="Sevak 2" value={record?.arts_craft?.sevak2} />

            <DetailItem title="Phone" value={record?.arts_craft?.phone} />
            <DetailItem title="Email" value={record?.arts_craft?.email} />

            <DetailItem
              title="Optional Phone"
              value={record?.arts_craft?.phone_optional}
            />

            <DetailItem
              title="Optional Email"
              value={record?.arts_craft?.email_optional}
            />

            <DetailItem
              title="Target Date"
              value={dayjs(record?.arts_craft?.target_date).format(
                "MM-DD-YYYY",
              )}
            />

            <DetailItem
              title="Flexible"
              value={record?.arts_craft?.is_flexible ? "Yes" : "No"}
            />

            <div className="border-b pb-2">
              <p className="medium">Craft Goal Description</p>
              <p className="regular">
                {record?.arts_craft?.craft_goal_description || "-"}
              </p>
            </div>

            <div className="border-b pb-2">
              <p className="medium">Reason</p>
              <p className="regular">{record?.arts_craft?.reason || "-"}</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default TeacherReqModal;
