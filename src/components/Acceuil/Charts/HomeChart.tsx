import React, { useEffect, useState } from "react";
import { RecepBlog, getDataBlog } from "../../Pages/Blog/HelpBlog";
import ChartBlog from "./ChartBlog";
import ChartCandidature from "./ChartCandidature";
import {
  RecepCandida,
  getDataCandida,
} from "../../Pages/RecepCandida/HelpCandid";
import { RecepRdv, getDataRdv } from "../../Pages/RecepRdv/HelpRdv";
import ChartRdv from "./ChartRdv";

const HomeChart: React.FC = () => {
  // BLOG
  const [Blog, setBlog] = useState<RecepBlog[]>([]);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getDataBlog();
        if (Array.isArray(response)) {
          setBlog(response);
        } else {
          setBlog([]);
        }
      } catch (error) {
        console.error("Erreur de fetching:", error);
        setBlog([]);
      }
    };

    fetchBlog();
  }, []);

  // CANDIDATURE

  const [Candid, setCandid] = useState<RecepCandida[]>([]);

  useEffect(() => {
    const fetchCandid = async () => {
      try {
        const data = await getDataCandida();
        if (data) {
          setCandid(data);
        }
      } catch (error) {
        console.error("Erreur de fetching:", error);
      }
    };

    fetchCandid();
  }, []);

  // RDV
  const [Rdv, setRdv] = useState<RecepRdv[]>([]);

  useEffect(() => {
    const fetchRdv = async () => {
      try {
        const data = await getDataRdv();
        console.log("Fetched data:", data);
        setRdv(data);
      } catch (error) {
        console.error("Erreur de fetching:", error);
      }
    };
    fetchRdv();
  }, []);
  return (
    <div className="d-flex justify-content-center flex-wrap gap-3 pt-5" style={{borderTop: ".1rem solid grey"}}>
      <div>
        <ChartBlog posts={Blog} />
      </div>
      <div>
        <ChartRdv posts={Rdv} />
      </div>
      <div>
        <ChartCandidature posts={Candid} />
      </div>
    </div>
  );
};

export default HomeChart;
