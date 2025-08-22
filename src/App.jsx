import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Calendar, Clock, BookOpen, Target, TrendingUp, AlertCircle, Star, Coffee } from 'lucide-react';
import './App.css';

const StudyBuddyDashboard = () => {
  // Calculate current day based on study start date (August 26, 2025)
  const getStudyDay = () => {
    const startDate = new Date('2025-08-23'); // Study start date
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.min(Math.max(1, diffDays), 15); // Keep within 1-15 range
  };

  const [currentDay, setCurrentDay] = useState(getStudyDay());
  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('studyBuddy_completedTasks');
    return saved ? JSON.parse(saved) : {};
  });
  const [mockScores, setMockScores] = useState(() => {
    const saved = localStorage.getItem('studyBuddy_mockScores');
    return saved ? JSON.parse(saved) : {};
  });
  const [mistakes, setMistakes] = useState(() => {
    const saved = localStorage.getItem('studyBuddy_mistakes');
    return saved ? JSON.parse(saved) : [];
  });
  const [newMistake, setNewMistake] = useState({ subject: 'Maths', topic: '', mistake: '' });
  const [motivation, setMotivation] = useState('');

  const subjects = ['Maths', 'Science', 'SST', 'English', 'IT', 'Sanskrit'];
  
  const examDates = {
    'English': 'Sept 11',
    'Maths': 'Sept 13', 
    'Science': 'Sept 15',
    'SST': 'Sept 16',
    'IT': 'Sept 20',
    'Sanskrit': 'Sept 22'
  };

  const motivationalQuotes = [
    "Bhai, ek ek chapter kar ke dekho - mountain bhi aise hi climb hota hai! 🏔️",
    "Maths weak hai? No problem! Practice se sab strong ho jata hai 💪",
    "Consistency is key! Har din thoda thoda, exam mein fatafat! 🚀",
    "Mock test mein kam marks? Learning opportunity hai - improve karo! 📈",
    "Rest bhi important hai - brain ko recharge karne do ☕",
    "You're doing great! Keep the momentum going 🔥"
  ];

  const studyPlan = {
    phase1: { // Day 1-5: Chapter Revision
      1: {
        maths: "Real Numbers + Polynomials",
        science: "Light (Reflection & Refraction)", 
        sst: "History Ch 1",
        english: "A Letter to God + Dust of Snow + Grammar"
      },
      2: {
        maths: "Linear Equations", 
        science: "Human Eye & Colourful World",
        sst: "History Ch 2 + 3",
        english: "Nelson Mandela + Fire & Ice + Writing"
      },
      3: {
        maths: "Quadratic Equations",
        science: "Chemistry Ch 1", 
        sst: "Geography Ch 1 + 2",
        english: "Two Stories About Flying + Tiger in Zoo"
      },
      4: {
        maths: "Arithmetic Progressions + Coordinate Geometry",
        science: "Chemistry Ch 2",
        sst: "Geography Ch 3 + 4", 
        english: "Anne Frank + How to Tell Wild Animals"
      },
      5: {
        maths: "Trigonometry + Probability",
        science: "Life Processes",
        sst: "Political Science Ch 1",
        english: "Glimpses of India + Ball Poem + Amanda"
      }
    },
    phase2: { // Day 6-10: PYQ + Sample Papers  
      6: {
        maths: "Real Numbers + Polynomials PYQ",
        science: "Physics Numericals + Diagrams",
        sst: "Economics Ch 1",
        english: "Triumph of Surgery + Thief's Story"
      },
      7: {
        maths: "Linear + Quadratic PYQ", 
        science: "Chemistry Reactions Practice",
        sst: "Economics Ch 2",
        english: "Midnight Visitor + Question of Trust" 
      },
      8: {
        maths: "AP + Coordinate Geometry PYQ",
        science: "Biology Diagrams Practice", 
        sst: "Political Science Ch 2",
        english: "Footprints Without Feet + Poems Revision"
      },
      9: {
        maths: "Trigonometry + Probability PYQ",
        science: "Science Sample Paper",
        sst: "Political Science Ch 3", 
        english: "Reading Comprehension + Grammar"
      },
      10: {
        maths: "Full Maths Mock Test",
        science: "Science Mock Test",
        sst: "SST Mock Test", 
        english: "English Sample Paper"
      }
    },
    phase3: { // Day 11-15: Final Exam Prep
      11: { focus: "English Exam Prep", secondary: "Light Revision" },
      12: { focus: "English Last Minute", secondary: "Maths Formula Revision" },
      13: { focus: "Maths Exam Prep", secondary: "Science Quick Review" },  
      14: { focus: "Maths Last Minute", secondary: "Science Diagrams" },
      15: { focus: "Science Exam Prep", secondary: "SST Quick Review" }
    }
  };

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('studyBuddy_completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem('studyBuddy_mockScores', JSON.stringify(mockScores));
  }, [mockScores]);

  useEffect(() => {
    localStorage.setItem('studyBuddy_mistakes', JSON.stringify(mistakes));
  }, [mistakes]);

  useEffect(() => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setMotivation(randomQuote);
  }, [currentDay]);

  // Get current date info
  const getCurrentDateInfo = () => {
    const startDate = new Date('2025-08-23');
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + (currentDay - 1));
    
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return {
      dateString: currentDate.toLocaleDateString('en-US', options),
      dayName: currentDate.toLocaleDateString('en-US', { weekday: 'long' }),
      dateOnly: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  };

  const toggleTask = (day, subject) => {
    const taskKey = `${day}-${subject}`;
    setCompletedTasks(prev => ({
      ...prev,
      [taskKey]: !prev[taskKey]
    }));
  };

  const addMockScore = (subject, score) => {
    setMockScores(prev => ({
      ...prev,
      [subject]: [...(prev[subject] || []), score]
    }));
  };

  const addMistake = () => {
    if (newMistake.topic && newMistake.mistake) {
      setMistakes(prev => [...prev, { ...newMistake, id: Date.now() }]);
      setNewMistake({ subject: 'Maths', topic: '', mistake: '' });
    }
  };

  const getCompletionRate = (day) => {
    const dayTasks = Object.keys(completedTasks).filter(key => key.startsWith(day + '-'));
    const completed = dayTasks.filter(key => completedTasks[key]).length;
    return dayTasks.length > 0 ? Math.round((completed / dayTasks.length) * 100) : 0;
  };

  const getCurrentPhase = () => {
    if (currentDay <= 5) return 'Chapter Revision';
    if (currentDay <= 10) return 'PYQ & Sample Papers';
    return 'Final Exam Prep';
  };

  const renderDayPlan = (day) => {
    if (day <= 5) {
      const plan = studyPlan.phase1[day];
      return Object.entries(plan).map(([subject, topic]) => (
        <div key={subject} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
          <div>
            <span className="font-semibold text-blue-600 capitalize">{subject}:</span>
            <span className="ml-2 text-gray-700">{topic}</span>
          </div>
          <button
            onClick={() => toggleTask(day, subject)}
            className="ml-2"
          >
            {completedTasks[`${day}-${subject}`] ? (
              <CheckCircle className="text-green-500 w-6 h-6" />
            ) : (
              <Circle className="text-gray-400 w-6 h-6" />
            )}
          </button>
        </div>
      ));
    } else if (day <= 10) {
      const plan = studyPlan.phase2[day];
      return Object.entries(plan).map(([subject, topic]) => (
        <div key={subject} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg mb-2">
          <div>
            <span className="font-semibold text-orange-600 capitalize">{subject}:</span>
            <span className="ml-2 text-gray-700">{topic}</span>
          </div>
          <button
            onClick={() => toggleTask(day, subject)}
            className="ml-2"
          >
            {completedTasks[`${day}-${subject}`] ? (
              <CheckCircle className="text-green-500 w-6 h-6" />
            ) : (
              <Circle className="text-gray-400 w-6 h-6" />
            )}
          </button>
        </div>
      ));
    } else {
      const plan = studyPlan.phase3[day];
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <div>
              <span className="font-semibold text-red-600">Main Focus:</span>
              <span className="ml-2 text-gray-700">{plan.focus}</span>
            </div>
            <button onClick={() => toggleTask(day, 'focus')} className="ml-2">
              {completedTasks[`${day}-focus`] ? (
                <CheckCircle className="text-green-500 w-6 h-6" />
              ) : (
                <Circle className="text-gray-400 w-6 h-6" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <span className="font-semibold text-blue-600">Secondary:</span>
              <span className="ml-2 text-gray-700">{plan.secondary}</span>
            </div>
            <button onClick={() => toggleTask(day, 'secondary')} className="ml-2">
              {completedTasks[`${day}-secondary`] ? (
                <CheckCircle className="text-green-500 w-6 h-6" />
              ) : (
                <Circle className="text-gray-400 w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📚 Study Buddy Dashboard
          </h1>
          <p className="text-lg text-gray-600">Class 10 - Term 1 Exam Preparation</p>
          <div className="bg-white rounded-lg p-4 mt-4 shadow-md">
            <div className="flex items-center justify-center space-x-4 mb-2">
              <Coffee className="text-orange-500" />
              <span className="text-lg font-medium">{motivation}</span>
            </div>
            <div className="text-center">
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
                📅 Today: {getCurrentDateInfo().dateString}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Day Plan */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Day {currentDay} - {getCurrentPhase()}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  📅 {getCurrentDateInfo().dayName}, {getCurrentDateInfo().dateOnly}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  disabled={currentDay === 1}
                >
                  ←
                </button>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg font-medium">
                  {currentDay}/15
                </span>
                <button
                  onClick={() => setCurrentDay(Math.min(15, currentDay + 1))}
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  disabled={currentDay === 15}
                >
                  →
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Today's Progress</span>
                <span>{getCompletionRate(currentDay)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${getCompletionRate(currentDay)}%` }}
                ></div>
              </div>
            </div>

            {/* Daily Tasks */}
            <div className="space-y-3">
              {renderDayPlan(currentDay)}
            </div>

            {/* Time Schedule */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                <Clock className="mr-2 w-5 h-5" />
                Daily Schedule
              </h3>
              <div className="text-sm space-y-1 text-gray-600">
                <div>📚 3:00-5:00 PM: Maths (2 hours)</div>
                <div>🔬 5:15-6:15 PM: Science (1 hour)</div>
                <div>🌍 6:30-7:30 PM: SST (1 hour)</div>
                <div>📝 8:00-9:00 PM: English (1 hour)</div>
                <div>⚡ 9:15-9:45 PM: Quick Recap (30 min)</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Exam Calendar */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Calendar className="mr-2" />
                Exam Dates
              </h3>
              <div className="space-y-2">
                {Object.entries(examDates).map(([subject, date]) => (
                  <div key={subject} className="flex justify-between p-2 bg-red-50 rounded">
                    <span className="font-medium">{subject}</span>
                    <span className="text-red-600">{date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mock Test Scores */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="mr-2" />
                Mock Scores
              </h3>
              
              <div className="space-y-2 mb-4">
                {subjects.map(subject => (
                  <div key={subject}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject}</span>
                      <span className="text-sm">
                        {mockScores[subject] ? `${mockScores[subject][mockScores[subject].length - 1]}/40` : 'No score'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <select 
                  className="w-full p-2 border rounded mb-2"
                  value=""
                  onChange={(e) => {
                    const [subject, score] = e.target.value.split('-');
                    if (subject && score) addMockScore(subject, parseInt(score));
                  }}
                >
                  <option value="">Add Mock Score</option>
                  {subjects.map(subject => 
                    Array.from({length: 41}, (_, i) => (
                      <option key={`${subject}-${i}`} value={`${subject}-${i}`}>
                        {subject} - {i}/40
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Mistake Notebook */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <AlertCircle className="mr-2" />
                Mistake Notebook
              </h3>
              
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {mistakes.map(mistake => (
                  <div key={mistake.id} className="p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-semibold text-red-600">{mistake.subject}</span>
                        <span className="text-sm text-gray-600 ml-2">{mistake.topic}</span>
                      </div>
                    </div>
                    <p className="text-sm mt-1 text-gray-700">{mistake.mistake}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <select 
                  value={newMistake.subject} 
                  onChange={(e) => setNewMistake({...newMistake, subject: e.target.value})}
                  className="w-full p-2 border rounded text-sm"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Topic (e.g., Quadratic Equations)"
                  value={newMistake.topic}
                  onChange={(e) => setNewMistake({...newMistake, topic: e.target.value})}
                  className="w-full p-2 border rounded text-sm"
                />
                <textarea
                  placeholder="Mistake description..."
                  value={newMistake.mistake}
                  onChange={(e) => setNewMistake({...newMistake, mistake: e.target.value})}
                  className="w-full p-2 border rounded text-sm h-20"
                />
                <button
                  onClick={addMistake}
                  className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 text-sm"
                >
                  Add Mistake
                </button>
              </div>
            </div>

            {/* Overall Progress */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Target className="mr-2" />
                Overall Progress
              </h3>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Days Completed</span>
                    <span>{currentDay - 1}/15</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${((currentDay - 1) / 15) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Tasks Completed</span>
                    <span>{Object.values(completedTasks).filter(Boolean).length}</span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-sm text-gray-600">
                    <strong>Focus Subject:</strong> Maths (Weak Area)
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Study Start:</strong> Aug 23, 2025
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Next Exam:</strong> English (Sept 11)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Star className="mr-2" />
            Daily Study Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800">Maths Focus</h4>
              <p className="text-sm text-blue-600 mt-1">Practice 5 problems daily, focus on formulas</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800">Break Time</h4>
              <p className="text-sm text-green-600 mt-1">15-min break between subjects</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800">Revision</h4>
              <p className="text-sm text-yellow-600 mt-1">Quick recap before sleep</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800">Mock Tests</h4>
              <p className="text-sm text-purple-600 mt-1">Time yourself during practice</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyBuddyDashboard;