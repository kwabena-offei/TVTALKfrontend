import React, { useState, useRef } from "react";
import { List, Box, DialogContent, DialogTitle, Slide } from "@mui/material";
import { ReportStep, FinalStep, Subtitle, BackArrow } from "./Report.styled";
import { steps } from "./constants";
import useAxios from "../../../services/api";

export default function ReportSteps({ id, url, commentType, onClose }) {
  const [currentStep, setCurrentStep] = useState("start");
  const [slideDirection, setSlideDirection] = useState("left");
  const containerRef = useRef(null);
  const { axios } = useAxios()

  const handleNextStep = (key, value) => {
    setSlideDirection("left");
    if (value.action === "update_type") {
      report.current.reportable_type = key;
    }
    if (value.action === "update_message") {
      report.current.message = value.text;
    }
    setCurrentStep(value.next_step);
  };
  const handlePreviousStep = () => {
    setSlideDirection("right");
    if (steps[currentStep].prev_step === "key") {
      setCurrentStep(report.current.reportable_type);
    }
    if (currentStep === report.current.reportable_type) {
      setCurrentStep("start");
    }
  };

  const report = useRef({
    reportable_type: "",
    reportable_id: id,
    message: "",
    url: url,
  });

  const handleValues = async (event) => {
    report.current.reportable_type = report.current.reportable_type === "User" ? "User" : commentType
    try {
      await axios.post(`/report`, {
        report: report.current
      })
    } catch (error) {
      console.error(error)
    } finally {
      onClose(event);
    }
  };

  const FinalStepRender = () => (
    <Slide
      direction={slideDirection}
      in={currentStep === "final"}
      mountOnEnter
      unmountOnExit
      children={
        <Box>
          <Subtitle>Thanks for reporting this</Subtitle>
          <FinalStep onClick={handleValues} text={steps.final.text} />
        </Box>
      }
    />
  );
  const MainStepsRender = ({ keyId, children }) => {
    return (
      <>
        <Slide
          direction={slideDirection}
          in={keyId === currentStep}
          mountOnEnter
          unmountOnExit
          container={containerRef.current}
        >
          <List as="div">
            {children}
          </List>
        </Slide>
      </>
    );
  };

  return (
    <>
      <Box>
        <BackArrow
          onClick={currentStep === "start" ? onClose : handlePreviousStep}
        />
        <DialogTitle>Report</DialogTitle>
      </Box>
      <DialogContent ref={containerRef}>
        <FinalStepRender />
        { currentStep !== 'final'
          ? <>
            <Subtitle>Why are you reporting this account?</Subtitle>
            <MainStepsRender keyId={currentStep !== "final" ? currentStep : null}>
              {Object.entries(steps[currentStep]).map(([key, value]) => {
                return (
                  <ReportStep
                    key={key}
                    text={value.text}
                    onClick={() => handleNextStep(key, value)}
                  />
                );
              })}
            </MainStepsRender>
          </>
          : null
        }
      </DialogContent>
    </>
  );
}
