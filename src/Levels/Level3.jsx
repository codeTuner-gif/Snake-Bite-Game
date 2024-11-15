import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Level3 = ({ setCompletedLevels }) => {
  const navigate = useNavigate();
  const [level2Selection, setLevel2Selection] = useState(null);
  const [deck, setDeck] = useState([]);
  const [deckIndex, setDeckIndex] = useState(null); 
  const [selectedCards1, setSelectedCards1] = useState({});
  const [selectedCards2, setSelectedCards2] = useState({});
  const [selectedCards3, setSelectedCards3] = useState({});
  const [selectedCards4, setSelectedCards4] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showWrongPopup, setShowWrongPopup] = useState(false);

  useEffect(() => {
    const level2Result = JSON.parse(localStorage.getItem("level2Result")) || [];
    if (level2Result) setLevel2Selection(level2Result);
  }, []);

  const initialDeck = [
    { id: 1, text: "Secure Respiratory and Airway" },
    { id: 2, text: "Admission" },
    { id: 3, text: "Start IVF with NS/5D" },
    { id: 4, text: "Inj. TT" },
    { id: 5, text: "Secure Airway" },
    { id: 6, text: "Avoid I/V cannula insertion in case of Haemotoxic bite" },
    { id: 7, text: "Avoid any IM or IV injections" },
    { id: 8, text: "Start Antibiotics immediately" },
    { id: 9, text: "Sedate with Diazepam" },
  ];

  const correctSequence = [
    { id: 1, text: "Secure Respiratory and Airway" },
    { id: 2, text: "Admission" },
    { id: 3, text: "Start IVF with NS/5D" },
    { id: 4, text: "Inj. TT" },
  ];

  // Shuffle function
  const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };

  // Set shuffled deck on mount
  useEffect(() => {
    const shuffledDeck = shuffleDeck([...initialDeck]);
    setDeck(shuffledDeck);
  }, []);

  const selectCard = (card, boxSetter) => {
    if (!card || !card.text) return;
    boxSetter(card);
    const newDeck = deck.filter((c) => c.id !== card.id);
    setDeck(newDeck);
    setDeckIndex(newDeck.length > 0 ? 0 : null);
  };

  const showNextCard = () => {
    if (deckIndex === null) setDeckIndex(0);
    else if (deckIndex < deck.length - 1) setDeckIndex(deckIndex + 1);
    else setDeckIndex(0);
  };

  useEffect(() => {
    if (
      selectedCards1.text &&
      selectedCards2.text &&
      selectedCards3.text &&
      selectedCards4.text
    ) {
      checkSequence();
    }
  }, [selectedCards1, selectedCards2, selectedCards3, selectedCards4]);

  const checkSequence = () => {
    const selectedCards = [
      selectedCards1.text,
      selectedCards2.text,
      selectedCards3.text,
      selectedCards4.text,
    ];

    const correctCards = correctSequence.map((card) => card.text);
    const isCorrect = selectedCards.every((selectedCard) =>
      correctCards.includes(selectedCard)
    );

    if (isCorrect) {
      setShowSuccessPopup(true);
      localStorage.setItem("level3Result", JSON.stringify(selectedCards));
    } else {
      setShowWrongPopup(true);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    handleCompleteLevel3();
  };

  const resetGame = () => {
    setSelectedCards1({});
    setSelectedCards2({});
    setSelectedCards3({});
    setSelectedCards4({});
    setDeck(shuffleDeck([...initialDeck])); // Shuffle deck on reset
    setShowSuccessPopup(false);
    setShowWrongPopup(false);
  };

  const handleCompleteLevel3 = (path = "/level4") => {
    const completedLevels = {
      level1: true,
      level2: true,
      level3: true,
    };
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
    setCompletedLevels(completedLevels);
    navigate(path);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-blue-400 mx-auto">Initial Management</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-20">
        {deck.map((card) => (
          <div
            key={card.id}
            className="border w-48 h-32 border-blue-500 p-4 bg-gray-100 rounded-lg text-center cursor-pointer hover:bg-gray-200"
            onClick={() =>
              selectCard(
                card,
                !selectedCards1.text
                  ? setSelectedCards1
                  : !selectedCards2.text
                  ? setSelectedCards2
                  : !selectedCards3.text
                  ? setSelectedCards3
                  : setSelectedCards4
              )
            }
          >
            <p>{card.text}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-8 mt-4">
        {[selectedCards1, selectedCards2, selectedCards3, selectedCards4].map(
          (card, idx) => (
            <div
              key={idx}
              className="border-2 border-blue-400 w-60 h-32 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700"
            >
              <p className="text-md text-center">{card.text}</p>
            </div>
          )
        )}
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Correct!</h2>
            <button
              onClick={() => handleCompleteLevel3("/level4")}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Proceed to the Next Level
            </button>
          </div>
        </div>
      )}

      {showWrongPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Incorrect!</h2>
            <p className="mb-6">You have selected the wrong sequence.</p>
            <button
              className="bg-red-400 text-white px-4 py-2 rounded-md"
              onClick={resetGame}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level3;
