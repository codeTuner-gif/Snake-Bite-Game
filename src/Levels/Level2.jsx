import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Level2 = ({ setCompletedLevels }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [his, setHis] = useState({});
  const [exam, setExam] = useState({});
  const [sc, setsc] = useState(0);
  const [box1, setBox1] = useState({});
  const [box2, setBox2] = useState({});
  const [box3, setBox3] = useState({});
  const [box4, setBox4] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [abc, setAbc] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedEnvenomationType, setSelectedEnvenomationType] = useState("");
  const [shuffledHistoryDeck, setShuffledHistoryDeck] = useState([]);
  const [shuffledExaminationDeck, setShuffledExaminationDeck] = useState([]);

  const handleCompleteLevel2 = () => {
    const completedLevels = { level1: true, level2: true };
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
    const array = [box1.code, box2.code, box3.code, box4.code];
    localStorage.setItem("level2Result", JSON.stringify(array));
    const array1 = [box1.text, box2.text, box3.text, box4.text];
    localStorage.setItem("level2TextResult", JSON.stringify(array1));
    setCompletedLevels(completedLevels);
    navigate("/level3");
  };

  useEffect(() => {
    localStorage.setItem("currentLevel", location.pathname);
    const savedLevel = localStorage.getItem("currentLevel");
    if (savedLevel && savedLevel !== location.pathname) {
      navigate(savedLevel);
    }
  }, [location, navigate]);

  useEffect(() => {
    if (box1 && box2 && box3 && box4) {
      checkrules(box1, box2, box3, box4);
    }
  }, [box1, box2, box3, box4]);

  const initialHistoryDeck = [
    { id: 1, text: "Painful Progressive Swelling", code: "H", type: "history" },
    {
      id: 2,
      text: "Continuous bleeding from bite site",
      code: "H",
      type: "history",
    },
    { id: 3, text: "Bleeding from the gum", code: "H", type: "history" },
    { id: 4, text: "Epistaxis", code: "H", type: "history" },
    { id: 5, text: "Vomiting", code: "H", type: "history" },
    { id: 6, text: "Haematemesis", code: "H", type: "history" },
    { id: 7, text: "Haemoptysis", code: "H", type: "history" },
    { id: 8, text: "Acute abdominal Pain", code: "H", type: "history" },
    { id: 9, text: "Bleeding per rectum", code: "H", type: "history" },
    { id: 10, text: "Low back pain", code: "H", type: "history" },
    { id: 11, text: "Declining urine output", code: "H", type: "history" },
    {
      id: 12,
      text: "Difficulty in focusing with eyelids feeling heavy",
      code: "N",
      type: "history",
    },
    { id: 13, text: "Diplopia", code: "N", type: "history" },
    {
      id: 14,
      text: "Progressive swelling and local pain",
      code: "N",
      type: "history",
    },
    {
      id: 15,
      text: "Numbness around lips and mouth",
      code: "N",
      type: "history",
    },
    {
      id: 16,
      text: "Paralysis noted early in the morning",
      code: "N",
      type: "history",
    },
    { id: 17, text: "Dyspnea", code: "N", type: "history" },
    { id: 18, text: "Dysphonia", code: "N", type: "history" },
    { id: 19, text: "Dysphagia", code: "N", type: "history" },
    {
      id: 20,
      text: "Acute pain abdomen starting from early in the morning",
      code: "N",
      type: "history",
    },
    {
      id: 21,
      text: "Unexplained throat/chest/joint pain",
      code: "X",
      type: "history",
    },
    { id: 22, text: "Salivation, Vomiting", code: "X", type: "history" },
  ];

  const initialExaminationDeck = [
    {
      id: 23,
      text: "Distinct bite mark with no swelling",
      code: "X",
      type: "exam",
    },
    {
      id: 24,
      text: "Local necrosis with rancid smell in a swollen limb with taught and shiny skin and skip lesions",
      code: "H",
      type: "exam",
    },
    {
      id: 25,
      text: "Significant Painful swelling involving the whole limb and extending onto the trunk",
      code: "H",
      type: "exam",
    },
    { id: 26, text: "Compartment Syndrome", code: "H", type: "exam" },
    {
      id: 27,
      text: "Tender enlargement of local lymph nodes",
      code: "H",
      type: "exam",
    },
    { id: 28, text: "Hypotension", code: "H", type: "exam" },
    {
      id: 29,
      text: "Petechiae, purpura and ecchymosis",
      code: "H",
      type: "exam",
    },
    { id: 30, text: "Asymmetrical pupil", code: "H", type: "exam" },
    {
      id: 31,
      text: "Parotid swelling, conjunctival edema, sub-conjunctival hemorrhage",
      code: "H",
      type: "exam",
    },
    { id: 32, text: "Ptosis", code: "N", type: "exam" },
    { id: 33, text: "Ophthalmoplegia", code: "N", type: "exam" },
    {
      id: 34,
      text: "Local necrosis and/or blistering",
      code: "N",
      type: "exam",
    },
    {
      id: 35,
      text: "Inability to swallow and aspiration of pooled secretions",
      code: "N",
      type: "exam",
    },
    { id: 36, text: "Cyanosis and altered sensorium", code: "N", type: "exam" },
    { id: 37, text: "Paradoxical respiration", code: "N", type: "exam" },
    { id: 38, text: "Dysarthria", code: "N", type: "exam" },
    {
      id: 39,
      text: "Ascending paralysis starting from early morning",
      code: "X",
      type: "exam",
    },
    {
      id: 40,
      text: "Unexplained respiratory distress in children in the presence of ptosis",
      code: "N",
      type: "exam",
    },
    {
      id: 41,
      text: "Sudden onset of Acute Flaccid Paralysis in a child",
      code: "N",
      type: "exam",
    },
    {
      id: 42,
      text: "Unexplained respiratory distress in children",
      code: "N",
      type: "exam",
    },
    {
      id: 43,
      text: "Mild swelling at bite site without progression",
      code: "X",
      type: "exam",
    },
    {
      id: 44,
      text: "Not enough signs or symptoms to diagnose poisonous snake bite",
      code: "X",
      type: "exam",
    },
  ];

  // Shuffle function
  const shuffle = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Shuffle decks on component mount and whenever the location changes
  useEffect(() => {
    const shuffledHistory = shuffle(initialHistoryDeck);
    const shuffledExam = shuffle(initialExaminationDeck);
    setShuffledHistoryDeck(shuffledHistory);
    setShuffledExaminationDeck(shuffledExam);
  }, [location]);

  const checkrules = (box1, box2, box3, box4) => {
    const boxes = [box1, box2, box3, box4];
    const allFilled = boxes.every((box) => box && Object.keys(box).length > 0);

    if (!allFilled) return; // Exit if not all boxes are filled

    const codes = boxes.map((box) => box.code);
    const types = boxes.map((box) => box.type);

    // Condition 1: All cards have the same code
    const allSameCode = codes.every((code) => code === codes[0]);

    // Condition 2: Max 3 cards from history and max 3 from examination
    const historyCount = types.filter((type) => type === "history").length;
    const examinationCount = types.filter((type) => type === "exam").length;

    const withinLimits = historyCount <= 3 && examinationCount <= 3;

    // Final check for success
    if (allSameCode && withinLimits) {
      // Set the envenomation type based on the code
      const envenomationType =
        codes[0] === "H"
          ? "Haemotoxic Envenomation"
          : codes[0] === "N"
          ? "Neurotoxic Envenomation"
          : "No Envenomation";

      setSelectedEnvenomationType(envenomationType);
      setShowSuccessPopup(true);
    } else {
      setAlertVisible(true);
    }
  };

  const res1 = () => {
    if (his && Object.keys(his).length > 0) {
      setBox1(his);
      setsc(sc + 1);
      checkrules(box1, box2, box3, box4);
    }
  };

  const res2 = () => {
    if (his && Object.keys(his).length > 0) {
      setBox2(his);
      setsc(sc + 1);
      checkrules(box1, box2, box3, box4);
    }
  };

  const res3 = () => {
    if (his && Object.keys(his).length > 0) {
      setBox3(his);
      setsc(sc + 1);
      checkrules(box1, box2, box3, box4);
    }
  };

  const res4 = () => {
    if (his && Object.keys(his).length > 0) {
      setBox4(his);
      setsc(sc + 1);
      checkrules(box1, box2, box3, box4);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    handleCompleteLevel2();
  };

  const resetGame = () => {
    // Reset the boxes
    setBox1({});
    setBox2({});
    setBox3({});
    setBox4({});

    // Reset the selected cards and other related states
    setSelectedCards([]);
    setSelectedCategory(null);

    // Reset any alerts or triggers
    setAbc(false);
    setAlertVisible(false);
    setShowSuccessPopup(false);

    // Reshuffle decks
    setShuffledHistoryDeck(shuffle(initialHistoryDeck));
    setShuffledExaminationDeck(shuffle(initialExaminationDeck));

    console.log("Game has been reset!");
  };

  const handleCardSelect = (card) => {
    // Check if the card is already selected
    const isCardSelected = selectedCards.some((c) => c.id === card.id);

    if (isCardSelected) {
      // If already selected, remove it
      setSelectedCards((prevCards) =>
        prevCards.filter((c) => c.id !== card.id)
      );

      // Add the card back to the appropriate deck
      if (card.type === "history") {
        setShuffledHistoryDeck((prevDeck) => [...prevDeck, card]);
      } else if (card.type === "exam") {
        setShuffledExaminationDeck((prevDeck) => [...prevDeck, card]);
      }
    } else if (selectedCards.length >= 4) {
      // Exceeded card limit
      setAbc(true); // Show alert for exceeding card limit
    } else {
      // Add the card to selectedCards
      const newCards = [...selectedCards, card];
      const historyCount = newCards.filter((c) => c.type === "history").length;
      const examinationCount = newCards.filter((c) => c.type === "exam").length;

      if (historyCount > 3 || examinationCount > 3) {
        setAbc(true); // Show alert for exceeding the max limit
      } else {
        // Update the selected cards and assign to boxes
        setSelectedCards(newCards);

        // Remove the card from the appropriate deck
        if (card.type === "history") {
          setShuffledHistoryDeck((prevDeck) =>
            prevDeck.filter((c) => c.id !== card.id)
          );
          if (newCards.length === 1) setBox1(card);
          else if (newCards.length === 2) setBox2(card);
          else if (newCards.length === 3) setBox3(card);
          else if (newCards.length === 4) setBox4(card);
        } else if (card.type === "exam") {
          setShuffledExaminationDeck((prevDeck) =>
            prevDeck.filter((c) => c.id !== card.id)
          );
          if (newCards.length === 1) setBox1(card);
          else if (newCards.length === 2) setBox2(card);
          else if (newCards.length === 3) setBox3(card);
          else if (newCards.length === 4) setBox4(card);
        }
      }
    }
  };

  const displayedCards =
    selectedCategory === "examination"
      ? shuffledExaminationDeck
      : shuffledHistoryDeck;

  return (
    <div className="w-full h-auto flex flex-col items-center">
      {/* Tabs for History and Examination */}
      <div className="w-full h-auto flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setSelectedCategory("history")}
          className={`px-4 py-2 rounded-lg text-white ${
            selectedCategory === "history" ? "bg-blue-700" : "bg-blue-500"
          } hover:bg-blue-600`}
        >
          History
        </button>
        <button
          onClick={() => setSelectedCategory("examination")}
          className={`px-4 py-2 rounded-lg text-white ${
            selectedCategory === "examination" ? "bg-blue-700" : "bg-blue-500"
          } hover:bg-blue-600`}
        >
          Examination
        </button>
      </div>

      <div className="w-full h-auto mt-6 flex flex-wrap justify-center gap-4">
        {displayedCards.map((card) => (
          <div
            key={card.id}
            className="border-2 border-blue-400 w-60 h-22 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => handleCardSelect(card)}
          >
            <p className="text-md text-center">{card.text}</p>
          </div>
        ))}
      </div>

      <div className="text-xl w-full h-30">
        <div>
          <h2 className="text-center text-lg font-bold mt-14">
            Select Correct option
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-4">
          <div
            className="border-2 border-blue-400 w-60 h-28 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105"
            onClick={res1}
          >
            <p className="text-md text-center">{box1.text}</p>
          </div>
          <div
            className="border-2 border-blue-400 w-60 h-28 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105"
            onClick={res2}
          >
            <p className="text-md text-center">{box2.text}</p>
          </div>
          <div
            className="border-2 border-blue-400 w-60 h-28 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105"
            onClick={res3}
          >
            <p className="text-md text-center">{box3.text}</p>
          </div>
          <div
            className="border-2 border-blue-400 w-60 h-28 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105"
            onClick={res4}
          >
            <p className="text-md text-center">{box4.text}</p>
          </div>
        </div>
      </div>

      {/* Success Popup for Correct Sequence */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            <h2 className="text-lg font-semibold text-green-600 mb-4">
              Success!
            </h2>
            <p className="text-md text-gray-700 mb-4">
              You have selected: <strong>{selectedEnvenomationType}</strong>
            </p>
            <button
              onClick={handleSuccessClose}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Proceed to the next level
            </button>
          </div>
        </div>
      )}

      {/* Wrong Alert */}
      {alertVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-red-600">
              Wrong Selection!
            </h2>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={resetGame}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {abc && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-red-600">Alert!</h2>
            <p className="text-lg">
              Maximum 3 cards can be selected from a deck
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => {
                setAbc(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level2;
