import { withAuthGuard } from "../component/higherOrder/withAuth";
import HomeLayout from "../component/shared/HomeLayout";
import { useRequest } from "../hooks";
import DOMPurify from "dompurify";

function PrivacyPolicy() {
  const { data, loading } = useRequest<any>("/static-content", "GET", {
    type: "mount",
    params: { type: "privacy_policy" },
  });

  return (
    <HomeLayout loading={loading}>
      <p className="text-[40px] semibold ">PRIVACY POLICY</p>
      <div className="bg-white p-5 rounded-[24.59px] mt-5 h-full">
        <div
          // className="text-[18px] regular text-[#333342]"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data[0]?.text || ""),
          }}
        />
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(PrivacyPolicy);
