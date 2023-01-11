import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useMemo, useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
  const [userStats, setUserStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  
  useEffect(() => {
console.log(process.env.REACT_APP_MEASUREMENTID)
    const getUserStats = async () => {
      const res = await axios.get("users/stats", {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWFjMWU4YzkxODY0YTMyNTNkMTM5YiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MTE3NDczNH0._3qZoikHlSSswVoirk-1hM6-mTB5r88SZuE8CUuXIlc",
        },
      });
      const resStats = res?.data?.sort((a, b) => a._id - b._id);
      resStats?.map((item) => {
        return setUserStats((prev) => {
          return [
            ...prev,
            { name: MONTHS[item._id - 1], "New Users": item.total },
          ];
        });
      });
    };
    getUserStats();
  }, [MONTHS]);
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New Users" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
