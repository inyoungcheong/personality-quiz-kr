// src/components/PersonalityQuiz.js
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './PersonalityQuiz.css';

const questions = [
  { id: 1, text: "조용한 편이야.", reverse: true, domain: "extraversion" },
  { id: 2, text: "따뜻한 마음을 가졌고 공감을 잘 해.", domain: "agreeableness" },
  { id: 3, text: "정리정돈을 잘 못하는 편이야.", reverse: true, domain: "conscientiousness" },
  { id: 4, text: "걱정이 많아.", domain: "negativeEmotionality" },
  { id: 5, text: "예술, 음악, 문학에 매료돼 있어.", domain: "openMindedness" },
  { id: 6, text: "리더십이 있고 주도적이야.", domain: "extraversion" },
  { id: 7, text: "가끔 다른 사람들한테 무례할 수 있어.", reverse: true, domain: "agreeableness" },
  { id: 8, text: "일 시작하는 걸 어려워해.", reverse: true, domain: "conscientiousness" },
  { id: 9, text: "우울함을 자주 느껴.", domain: "negativeEmotionality" },
  { id: 10, text: "추상적인 아이디어에 큰 관심이 없어.", reverse: true, domain: "openMindedness" },
  { id: 11, text: "에너지가 넘쳐.", domain: "extraversion" },
  { id: 12, text: "다른 사람들의 좋은 면을 먼저 봐.", domain: "agreeableness" },
  { id: 13, text: "믿을 수 있고 항상 의지할 수 있는 사람이야.", domain: "conscientiousness" },
  { id: 14, text: "감정적으로 안정됐고 쉽게 동요하지 않아.", reverse: true, domain: "negativeEmotionality" },
  { id: 15, text: "독창적이고 새로운 아이디어를 잘 떠올려.", domain: "openMindedness" },
  { id: 16, text: "사교적이고 외향적이야.", domain: "extraversion" },
  { id: 17, text: "차갑고 무심한 편이야.", reverse: true, domain: "agreeableness" },
  { id: 18, text: "깔끔하고 정돈된 걸 좋아해.", domain: "conscientiousness" },
  { id: 19, text: "스트레스에 잘 대처하고 침착해.", reverse: true, domain: "negativeEmotionality" },
  { id: 20, text: "예술적 관심이 별로 없어.", reverse: true, domain: "openMindedness" },
  { id: 21, text: "다른 사람이 이끌어주는 걸 선호해.", reverse: true, domain: "extraversion" },
  { id: 22, text: "다른 사람을 존중하고 예의 바르게 대해.", domain: "agreeableness" },
  { id: 23, text: "시작한 일은 끝까지 해내.", domain: "conscientiousness" },
  { id: 24, text: "나 자신에 대해 편안하고 자신 있어.", reverse: true, domain: "negativeEmotionality" },
  { id: 25, text: "복잡한 문제를 깊이 생각하는 걸 좋아해.", domain: "openMindedness" },
  { id: 26, text: "다른 사람들보다 활동적이지 않아.", reverse: true, domain: "extraversion" },
  { id: 27, text: "다른 사람의 단점을 잘 찾는 편이야.", reverse: true, domain: "agreeableness" },
  { id: 28, text: "가끔 덜렁대고 부주의할 수 있어.", reverse: true, domain: "conscientiousness" },
  { id: 29, text: "감정 기복이 심하고 쉽게 흥분해.", domain: "negativeEmotionality" },
  { id: 30, text: "창의력이 부족해.", reverse: true, domain: "openMindedness" }
];

const domainDescriptions = {
  extraversion: "외향성은 사회적 상황에서의 에너지와 열정을 나타내.",
  agreeableness: "친화성은 다른 사람들과의 관계와 상호작용 방식을 보여줘.",
  conscientiousness: "성실성은 조직력과 책임감의 수준을 나타내.",
  negativeEmotionality: "부정적 정서성은 감정적 민감도와 안정성을 보여줘.",
  openMindedness: "개방성은 호기심과 창의성의 정도를 나타내."
};

const PersonalityQuiz = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion]: value
    });
  };

  const calculateResults = () => {
    const scores = {
      extraversion: [],
      agreeableness: [],
      conscientiousness: [],
      negativeEmotionality: [],
      openMindedness: []
    };

    questions.forEach((question, index) => {
      if (answers[index] !== undefined) {
        let score = parseInt(answers[index]);
        if (question.reverse) {
          score = 6 - score;
        }
        scores[question.domain].push(score);
      }
    });

    const results = Object.entries(scores).map(([domain, scores]) => {
      const average = scores.length > 0 
        ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)
        : 0;
      
      const domainNames = {
        extraversion: "외향성",
        agreeableness: "친화성",
        conscientiousness: "성실성",
        negativeEmotionality: "부정적 정서성",
        openMindedness: "개방성"
      };

      return {
        domain: domainNames[domain],
        score: parseFloat(average),
        description: domainDescriptions[domain]
      };
    });

    return results;
  };

  // 인트로 화면
  const IntroScreen = () => (
    <div className="quiz-card">
      <div className="quiz-header">
        <h2>당신의 그리스로마 신화 캐릭터는?</h2>
      </div>
      <div className="quiz-content">
        <div className="intro-text">
          <p className="intro-description">
            이 테스트는 Big Five 성격 특성을 기반으로 당신의 고유한 성격 프로필에 매칭되는 그리스로마신화 속의 캐릭터를 보여줍니다.
          </p>
          
          <div className="intro-features">
            <h3>테스트 특징:</h3>
            <ul>
              <li>30개의 간단한 질문</li>
              <li>5가지 주요 성격 특성 분석</li>
              <li>강점과 성장 가능한 영역 파악</li>
            </ul>
          </div>

          <div className="time-estimate">
            <p>📝 소요 시간: 약 5-10분</p>
          </div>

          <div className="instructions">
            <p>✨ 팁: 가능한 한 솔직하게 답변해 주세요. 정답이나 오답은 없습니다.</p>
          </div>
        </div>

        <button 
          onClick={() => setStarted(true)}
          className="quiz-button primary start-button"
        >
          테스트 시작하기
        </button>
      </div>
    </div>
  );

  if (!started) {
    return <IntroScreen />;
  }

  if (showResults) {
    const Results = calculateResults();
    
    return (
      <Results 
        results={results} 
        onRestart={() => {
          setShowResults(false);
          setAnswers({});
          setCurrentQuestion(0);
        }}
      />
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="quiz-card">
      <div className="quiz-header">
        <h2>질문 {currentQuestion + 1} / {questions.length}</h2>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
      <div className="quiz-content">
        <p className="question-text">{questions[currentQuestion].text}</p>
        <div className="radio-group">
          {[
            ["1", "전혀 그렇지 않아"],
            ["2", "별로 그렇지 않아"],
            ["3", "보통이야"],
            ["4", "약간 그래"],
            ["5", "매우 그래"]
          ].map(([value, label]) => (
            <label key={value} className="radio-option">
              <input
                type="radio"
                name="answer"
                value={value}
                checked={answers[currentQuestion] === value}
                onChange={(e) => handleAnswer(e.target.value)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
        
        <div className="button-group">
          <button 
            onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
            className="quiz-button secondary"
          >
            이전
          </button>
          <button 
            onClick={() => {
              if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
              } else {
                setShowResults(true);
              }
            }}
            disabled={!answers[currentQuestion]}
            className="quiz-button primary"
          >
            {currentQuestion < questions.length - 1 ? '다음' : '결과 보기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalityQuiz;