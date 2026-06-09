import {
  TRAITS,
  createEmptyScoreVector,
} from "@selfimage/shared";

import type {
  Score,
  PartialScoreVector,
} from "@selfimage/shared";

import { useState } from "react";


const SCORES: Score[] = [0, 1, 2, 3, 4, 5, 6];

function App() {
  
  const [beforeScores, setBeforeScores] =
  useState<PartialScoreVector>(() => createEmptyScoreVector());

const [afterScores, setAfterScores] =
  useState<PartialScoreVector>(() => createEmptyScoreVector());
  const [currentPage, setCurrentPage] = useState(0);
  const currentTrait = TRAITS[currentPage];


function handleBeforeSelect(score: Score) {
  setBeforeScores({
    ...beforeScores,
    [currentTrait.id]: score,
  });
}

function handleAfterSelect(score: Score) {
  setAfterScores({
    ...afterScores,
    [currentTrait.id]: score,
  });
}



const before = beforeScores[currentTrait.id];
const after = afterScores[currentTrait.id];



const isComplete = before != null && after != null;
const isFirstPage = currentPage === 0;

const currentStep = currentPage + 1;
const totalSteps = TRAITS.length;
const progress = ((currentPage + 1) / TRAITS.length) * 100;

const [showSummary, setShowSummary] = useState(false);

const labelWidth = 220;
const cellSize = 40;
const gap = 6;

const gridWidth =
  SCORES.length * cellSize + (SCORES.length - 1) * gap;


if (showSummary) {
  return (
      <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 40,
      }}
      >
      <h1 style={{ fontSize: "42px" }} >Summary</h1>

      <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    <div style={{ width: 12, height: 12, background: "blue", opacity: 0.5, borderRadius: "50%" }} />
    <span>How you think you are</span>
  </div>

  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    <div style={{ width: 12, height: 12, background: "green", opacity: 0.5 }} />
    <span>How you would like to be</span>
  </div>
</div>


      <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: 20,
  }}
>
  {TRAITS.map((trait) => {
    const before = beforeScores[trait.id];
    const after = afterScores[trait.id];

    return (
  <div
    key={trait.id}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 20,
    }}
  >
    <div
      style={{
        width: 120,
        fontWeight: "bold",
        textAlign: "right",
      }}
    >
      {trait.label}
    </div>

  <div
    style={{
      display: "flex",
      gap: 6,
    }}
  >
          {SCORES.map((score) => {
            const isBefore = before === score;
            const isAfter = after === score;

            return (
              <div
                key={score}
                style={{
                  width: 40,
                  height: 40,
                  border: "1px solid black",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {score}

                {/* Before = blue circle */}
                {isBefore && (
                  <div
                    style={{
                      position: "absolute",
                      width: "80%",
                      height: "80%",
                      borderRadius: "50%",
                      background: "blue",
                      opacity: 0.5,
                    }}
                  />
                )}

                {/* After = green square */}
                {isAfter && (
                  <div
                    style={{
                      position: "absolute",
                      width: "80%",
                      height: "80%",
                      background: "green",
                      opacity: 0.5,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  })}
</div>

<div style={{ marginTop: 20, display: "flex", gap: 10 }}>
    {/* Back */}
    <button
    onClick={() => {
      setShowSummary(false);
      setCurrentPage(TRAITS.length - 1);
      
    }}

    style={{
      padding: "8px 16px",
      cursor: isFirstPage ? "default" : "pointer",
      opacity: isFirstPage ? 0.5 : 1,
    }}
    >
      Back
    </button>

    {/* Next */}
    <button
    onClick={() => {
      if (currentPage === TRAITS.length - 1) {
        setShowSummary(true);
      } else {
      setCurrentPage((prev) => prev + 1);
      
      }
    }}
    disabled={true}
    style={{
      padding: "8px 16px",
      cursor: isComplete ? "default" : "pointer"  ,
      opacity: isComplete ? 1 : 0.5,
    }}
    >
      Next
    </button>
</div>

</div>

  );
}

    return (
    <div
        style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
            padding: 40,
            boxSizing: "border-box",
          }}
      >
      <h1 style={{ fontSize: "42px" }} >
        {currentTrait.label}
      </h1>


      {/* SCALE LABELS (ONLY ONCE) */}
<div style={{ display: "flex", marginBottom: 8 }}>
  {/* empty space matching "Before/After" column */}
  <div style={{ width: labelWidth }} />

  {/* header aligned with grid */}
  <div
    style={{
      width: gridWidth,
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <span>Not at all</span>
    <span>Very much</span>
  </div>
</div>

{/* BEFORE ROW */}
<div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
  <div style={{ width: 220, textAlign: "center" }}>How  you  think  you  are</div>

  <div style={{ display: "flex", gap: 6 }}>
    {SCORES.map((score) => {
      const selected = beforeScores[currentTrait.id] === score;

      return (
        <div
          key={score}
          onClick={() => handleBeforeSelect(score)}
          style={{
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid black",
            position: "relative",
            cursor: "pointer",
          }}
        >
          {score}

          {selected && (
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: "blue",
                opacity: 0.4,
              }}
            />
          )}
        </div>
      );
    })}
  </div>
</div>

{/* AFTER ROW */}
<div style={{ display: "flex", alignItems: "center" }}>
  <div style={{ width: 220, textAlign: "center" }}>How you would like to be</div>

  <div style={{ display: "flex", gap: 6 }}>
    {SCORES.map((score) => {
      const selected = afterScores[currentTrait.id] === score;

      return (
        <div
          key={score}
          onClick={() => handleAfterSelect(score)}
          style={{
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid black",
            position: "relative",
            cursor: "pointer",
          }}
        >
          {score}

          {selected && (
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                background: "green",
                opacity: 0.4,
              }}
            />
          )}
        </div>
      );
    })}
  </div>
</div>



      {/* OUTPUT */}
      {/* <div style={{ textAlign: "center" }}>

          <p>
            Before: {beforeScores[currentTrait] ?? "-"}
          </p>

          <p>
            After: {afterScores[currentTrait] ?? "-"}
          </p>

          <p>
            Delta: {delta ?? "-"}
          </p>
        </div> */}




    <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
    {/* Back */}
    <button
    onClick={() => {
      setCurrentPage((prev) => Math.max(prev - 1, 0));

      
    }}
    disabled={isFirstPage}
    style={{
      padding: "8px 16px",
      cursor: isFirstPage ? "default" : "pointer",
      opacity: isFirstPage ? 0.5 : 1,
    }}
    >
      Back
    </button>

    {/* Next */}
    <button
    onClick={() => {
      if (currentPage === TRAITS.length - 1) {
        setShowSummary(true);
      } else {
      setCurrentPage((prev) => prev + 1);
      
      }
    }}
    disabled={!isComplete}
    style={{
      padding: "8px 16px",
      cursor: isComplete ? "pointer" : "default" ,
      opacity: isComplete ? 1 : 0.5,
    }}
    >
      Next
    </button>
</div>

{/* % COMPLETION */}
<div style={{ marginTop: 35, width: 200 }}>
  {/* bar background */}
  <div
    style={{
      height: 8,
      background: "#e5e5e5",
      borderRadius: 999,
      overflow: "hidden",
    }}
  >
    {/* filled bar */}
    <div
      style={{
        height: "100%",
        width: `${progress}%`,
        background: "#6c6c75",
        transition: "width 0.3s ease",
      }}
    />
  </div>

  {/* text */}
  <p style={{ fontSize: 12, textAlign: "center", marginTop: 6 }}>
    {currentStep} / {totalSteps} 
  </p>
</div>


    </div>
  );
}

export default App;