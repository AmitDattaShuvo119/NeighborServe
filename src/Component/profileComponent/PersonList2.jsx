import React, { useState, useEffect, useContext } from "react";
import ProfileComponent from "./ProfileComponent";
import { AuthContext } from "../../Providers/AuthProviders";
import BarLoader from "react-spinners/BarLoader";
import { Link } from "react-router-dom";
import { set } from "react-hook-form";

function PersonList2({ searchString }) {
  const userId = localStorage.getItem("userID");
  const [recommendationValue, setRecommendationValue] = useState(0);
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!userId; // Convert to a boolean

  const [refreshKey, setRefreshKey] = useState(0);

  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(index1 + 5);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(0);

  const pageChange = () => {
    setIndex1(index1 + 5);
    setPage(page + 1);
  };

  const pageChange2 = () => {
    setIndex1(Math.max(0, index1 - 5));
    setPage(Math.max(1, page - 1));
  };

  useEffect(() => {
    setIndex2(index1 + 5);
  }, [index1]);

  const handleRefreshClick = () => {
    // Increment the key to trigger a re-render
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#4C40ED",
  };

  const [loading, setLoading] = useState(true);
  const [colorIndex, setColorIndex] = useState(0);
  const predefinedColors = ["#4C40ED", "#0000FF", "#ab20fd"];
  const [dataArray, setDataArray] = useState([]);
  const [initialData, setInitialData] = useState([]);

  const x = searchString;

  const apiUrl = `http://localhost:5000/providers/providers/${userId}/${x}`;
  const apiUrlnew = `http://127.0.0.1:5001/api/v1/hello?id=${userId}&category=${x}`;
  const [recommendationId, setRecommendationId] = useState(null);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % predefinedColors.length);
    }, 1500);

    return () => clearInterval(colorInterval);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setDataArray(data);
          const l = data.length;
          console.log("page: " + l / 5);
          setPageLimit(l / 5); // Assuming you want to set the page limit based on the data length
          setInitialData(data); // Store the initial data
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [apiUrl, isLoggedIn]);

  const recommendation = async () => {
    setRecommendationValue(1);
    try {
      console.log("Hello");
      const response = await fetch(apiUrlnew);
      const data = await response.json();

      if (data) {
        setRecommendationId(data.recommendation);
      }
      console.log(recommendationId); // Move the log here
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data based on recommendationId or recommendationValue
    if (
      isLoggedIn &&
      (recommendationId !== null || recommendationValue === 1)
    ) {
      const apiUrlnew2 = `http://localhost:5000/providers/providersProfile?id=${recommendationId}`;
      fetch(apiUrlnew2)
        .then((response) => response.json())
        .then((data) => {
          setDataArray(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [recommendationId, isLoggedIn]);

  const handleShowAllClick = () => {
    // Reset the recommendation state and show the initial results
    setRecommendationValue(0);
    setRecommendationId(null);
    setDataArray(initialData);
  };

  if (!user) {
    return (
      <div style={{ marginLeft: "50%", marginTop: "2%" }}>
        {isLoggedIn ? (
          <BarLoader
            color={predefinedColors[colorIndex]}
            loading={loading}
            css={override}
            size={9}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <p style={{ marginLeft: "-25%" }}>
            Please{" "}
            <Link to={"/login"}>
              <span style={{ color: "#4C40ED" }}>Login</span>
            </Link>{" "}
            or{" "}
            <Link to={"/reg"}>
              <span style={{ color: "#4C40ED" }}>Signup</span>
            </Link>{" "}
            first
          </p>
        )}
      </div>
    );
  }

  return (
    <section key={refreshKey}>
      <div
        className="tooltip tooltip-right"
        data-tip="This recommendation system provides personalized suggestions to users based on their history and preferences"
      >
        <button
          style={{
            marginBottom: "10px",
            marginTop: "10px",
            color: "white",
            whiteSpace: "nowrap",
          }}
          onClick={recommendation}
          className="btn btn-primary"
        >
          Smart Recommendation
        </button>
      </div>{" "}
      {recommendationValue === 1 && (
        <p style={{ marginTop: "5px", marginBottom: "5px", fontSize: "18px" }}>
          Recommended <span style={{ color: "#4C40ED" }}>{x}</span> for you
        </p>
      )}
      {dataArray.slice(index1, index2).map((person, personIndex) => (
        <ProfileComponent {...person} key={person.id} />
      ))}
      {recommendationValue === 1 && (
        <button
          style={{ marginBottom: "10px", marginTop: "10px", color: "white" }}
          onClick={handleShowAllClick}
          className="btn btn-primary"
        >
          Show All
        </button>
      )}
      {/* <button className="btn btn-primary" onClick={pageChange}>
        asd
      </button>{" "} */}
      <br />
      {recommendationValue !== 1 && (
        <div
          className="join"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {page > 1 && (
            <button
              style={{ color: "#4C40ED" }}
              className="join-item btn"
              onClick={pageChange2}
            >
              «
            </button>
          )}
          <button
            style={{ color: "#4C40ED", backgroundColor: "#F2F2F2" }}
            disabled
            className="join-item btn"
          >
            Page {page}
          </button>
          {page < pageLimit && (
            <button
              style={{ color: "#4C40ED" }}
              className="join-item btn"
              onClick={pageChange}
            >
              »
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export default PersonList2;
