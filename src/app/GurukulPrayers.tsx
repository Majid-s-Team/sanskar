import { Input } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import { withAuthGuard } from "../component/higherOrder/withAuth";

function GurukulPrayers() {
  return (
    <HomeLayout>
      <div className="bg-white p-5 rounded-[24.59px]">
        <div className="flex lg:flex-row flex-col gap-5 justify-between lg:items-center">
          <p className="text-[40px] semibold">Gurukul Prayers</p>
          <div className="flex gap-5 items-center">
            <div>
              <img className="w-[25px]" src="/icons/filter.png" />
            </div>
            <Input
              placeholder="Search"
              className={`search-input h-[35px] lg:w-[227.28px]`}
              style={{
                borderRadius: 6,
                backgroundColor: "#F5F4F9",
                border: "none",
              }}
              prefix={<img className="w-[20px]" src="/icons/search.png" />}
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-5 p-5 mt-5">
          {[1, 2, 3, 4, 5].map((index) => {
            return (
              <div key={index} className="space-y-3">
                <p className="text-[24px] semibold">Early Morning Prayer</p>
                <img
                  style={{
                    boxShadow: "0px 8.4px 16.79px 0px #00000040",
                  }}
                  className="w-[394.64px] border-2 border-[#FF881A] rounded-[20px]"
                  src="/images/player.png"
                />
              </div>
            );
          })}
        </div>
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(GurukulPrayers);
