import HomeLayout from "../component/shared/HomeLayout";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import HomeSection1 from "../component/partial/HomeSection1";
import HomeSection2 from "../component/partial/HomeSection2";
import HomeSection3 from "../component/partial/HomeSection3";
import { getStorageData } from "../helper";

const Home = () => {
  const role = getStorageData("role");
  return (
    <HomeLayout>
      <HomeSection1 role={role} />
      <HomeSection2 role={role} />
      <HomeSection3 role={role} />
    </HomeLayout>
  );
};

export default withAuthGuard(Home);
