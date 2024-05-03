import { Route, Routes, useLocation } from "react-router-dom";
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Complete from "./pages/Complete";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import styled from "styled-components";
import TopbarLayout from "./TopbarLayout";
import Select from "./pages/Select";
import PersonalInformationAgreement from "./pages/PersonalInformationAgreement";
import WIP from "./pages/WIP";
import { useState } from "react";
import { RecoilRoot } from "recoil";

function App() {
  const location = useLocation();
  const [ready, setReady] = useState(true);
  return (
    <>
      <Bg>
        {ready ? (
          <RecoilRoot>
            <Routes>
              <Route path="/" element={<Splash />} />
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<TopbarLayout />}>
                <Route path="/select" element={<Select />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/complete" element={<Complete />} />
              </Route>
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route
                path="/personal-information-agreement"
                element={<PersonalInformationAgreement />}
              />
            </Routes>
          </RecoilRoot>
        ) : (
          <Routes>
            <Route path="/" element={<WIP />} />
          </Routes>
        )}
      </Bg>
    </>
  );
}

export default App;
const Bg = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f0f0f0;
`;
