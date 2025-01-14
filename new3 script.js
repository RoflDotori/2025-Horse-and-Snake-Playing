let currentQuestion = 0;
let answers = {};
let questions = [
    {
        id: 1,
        text: "당신의 이름은 무엇인가요?",
        type: "text",
        required: true
    },
    {
        id: 2,
        text: "나는 새해에",
        type: "radio",
        options: [
            { value: "snake", text: "구체적인 목표를 원해요" },
            { value: "horse", text: "가치있는 마음가짐을 원해요" }
        ]
    }
];

const snakeQuestions = [
    {
        id: 3,
        text: "2025년의 목표는 무엇인가요?",
        type: "radio",
        options: [
            { value: "health", text: "건강 (예: 체중 감량, 운동, 회복)" },
            { value: "money", text: "돈 (예: 저축, 투자)" },
            { value: "education", text: "학업/직업 (예: 자격증 취득, 시험 합격, 승진)" },
            { value: "relationship", text: "인간관계 (예: 가족과 시간 많이 보내기, 새로운 친구 만들기)" },
            { value: "growth", text: "개인 성장 (예: 독서, 취미 활동)" }
        ],
        hasOther: true
    },
    {
        id: 4,
        text: "목표 달성을 방해할 수 있는 가장 큰 장애물은 무엇인가요?",
        type: "radio",
        options: [
            { value: "time", text: "시간 부족" },
            { value: "motivation", text: "동기 부족" },
            { value: "resource", text: "자원 부족 (예: 돈, 정보)" },
            { value: "opposition", text: "주변의 반대" }
        ],
        hasOther: true
    },
    {
        id: 5,
        text: "장애물을 극복하기 위한 방법은 무엇일까요?",
        type: "radio",
        options: [
            { value: "wave", text: "일정을 재조정하기" },
            { value: "blue", text: "목표를 작게 나누기" },
            { value: "stream", text: "다른 사람들에게 물어보기" },
            { value: "lake", text: "자료 찾기" }
        ],
        hasOther: true
    }
];
const horseQuestions = [
    {
        id: 3,
        text: "나만의 2025년의 말은 무엇인가요?",
        type: "text",
        placeholder: "올해의 좌우명을 적어주세요",
        required: true
    },
    {
        id: 4,
        text: "2025년의 말로 무엇을 이루게 될까요?",
        type: "checkbox",
        options: [
            { value: "positive", text: "긍정" },
            { value: "persistence", text: "끈기" },
            { value: "patience", text: "인내" },
            { value: "openMind", text: "열린 마음" },
            { value: "love", text: "사랑" },
            { value: "success", text: "성공" },
            { value: "achievement", text: "목표 달성" },
            { value: "wisdom", text: "지혜" },
            { value: "strength", text: "체력" },
            { value: "health", text: "건강" }
        ],
        hasOther: true
    },
    {
        id: 5,
        text: "나의 말은 무슨 색깔인가요?",
        type: "radio",
        options: [
            { value: "red", text: "강한 빨강" },
            { value: "yellow", text: "평온한 노랑" },
            { value: "green", text: "자라는 초록" },
            { value: "blue", text: "돌진하는 파랑" },
            { value: "purple", text: "꿈꾸는 보라" }
        ]
    }
];

const snakeTypes = {
    'wave': {
        type: '찰랑이는 물결뱀',
        description: '때론 유연함이 문제를 더 쉽게 푸는 방법이 되기도 해요. \'찰랑이는 물결뱀\'과 함께라면 딱딱해지려는 계획이 부드러워질거에요. 제가 흘러가는대로 함께 오세요! 가끔은 이렇게 흘러가는대로 두어도 잘 도착할 수 있어요!',
        image: 'images/snake-wave.png'
    },
    'blue': {
        type: '푸른 파도 뱀',
        description: '콰광! \'푸른 파도 뱀\'이 목표를 작은 모래알로 만들었어요! 덩치가 큰 목표는 어렵지만 작은 모래알 하나쯤은 금방 해치울 수 있으니까요!',
        image: 'images/snake-blue.png'
    },
    'stream': {
        type: '쫄쫄 시냇물 뱀',
        description: '이런..어떻게 해야 할지 모르겠나요? \'쫄쫄 시냇물 뱀\'과 함께 도와줄 사람들을 찾아요! 쫄쫄 흐르는 시냇물을 따라 가다보면 먼저 이 물길을 타 본 사람들을 만날 수 있을거에요. (쫄쫄..) 꼭 필요한 사람을 늦지 않게 만날 수 있게 함께할게요!',
        image: 'images/snake-stream.png'
    },
    'lake': {
        type: '맑은 호수 뱀',
        description: '\'맑은 호수뱀\'과 함께라면 맑은 머리로 꼭 필요한 자료들을 만나게 될 거에요. 앗…이런 너무 많이 찾았나. (냠냠) 괜찮아요! 자료는 제가 다 먹었어요! 잘 몰라서 목표가 흐려지지 않도록 (냠냠) 잘 찾아봐요!',
        image: 'images/snake-lake.png'
    },
    'other': {
        type: '별 총총 푸른 뱀',
        description: '앗, 이미 장애물을 넘어갈 도토리만의 답을 알고 있군요! \'별총총 푸른 뱀\'은 한 발 짝 뒤에서 응원하고 있을게요! 잊지 마세요. 푸른 밤이 지나고 나면 파란 아침은 온답니다. (사실 깊고 푸른 밤에도 반짝이는 별들은 항상 있어요)',
        image: 'images/snake-star.png'
    }
};

const horseColors = {
    'red': {
        description: '일상이 감히 방해하지 못할 굳세고 단단한 2025년을 보낼거에요!',
        image: 'images/horse-red.png'
    },
    'yellow': {
        description: '한적한 오후의 따뜻한 햇살같이 평온한 2025년을 보낼거에요!',
        image: 'images/horse-yellow.png'
    },
    'green': {
        description: '세상에 처음 솟아나는 새싹처럼 쑥쑥 자라는 2025년을 보낼거에요!',
        image: 'images/horse-green.png'
    },
    'blue': {
        description: '우루루 돌진하는 파도처럼 질주하는 2025년을 보낼거에요!',
        image: 'images/horse-blue.png'
    },
    'purple': {
        description: '달콤한 꿈 같은 2025년을 보낼거에요! 나쁜 꿈은 깨어나면 그만, 좋은 꿈은 이루면 그만!',
        image: 'images/horse-purple.png'
    }
};
function startTest() {
    document.getElementById('intro').classList.add('d-none');
    document.getElementById('question-container').classList.remove('d-none');
    showQuestion();
}

function showQuestion() {
    const question = getCurrentQuestion();
    if (!question) return;

    updateProgressBar();
    
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    
    questionElement.innerHTML = `<h3 class="mb-4">${question.text}</h3>`;
    optionsElement.innerHTML = '';

    switch (question.type) {
        case 'text':
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control';
    input.placeholder = question.placeholder || '답변을 입력해주세요';
    input.value = answers[question.id] || '';
    input.title = question.text; // title 속성 추가
    input.setAttribute('aria-label', question.text); // aria-label 추가
    input.oninput = (e) => {
        answers[question.id] = e.target.value;
        updateNavigationButtons();
    };
    optionsElement.appendChild(input);
    break;

        case 'radio':
            question.options.forEach(option => {
                const div = document.createElement('div');
                div.className = 'option-card';
                div.onclick = () => {
                    answers[question.id] = option.value;
                    updateNavigationButtons();
                    document.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
                    div.classList.add('selected');
                };
                div.innerHTML = `
                    <input type="radio" name="q${question.id}" value="${option.value}" 
                        ${answers[question.id] === option.value ? 'checked' : ''}>
                    <label class="ms-2">${option.text}</label>
                `;
                optionsElement.appendChild(div);
            });
if (question.hasOther) {
                const otherDiv = document.createElement('div');
                otherDiv.className = 'option-card';
                const otherInput = document.createElement('input');
                otherInput.type = 'text';
                otherInput.className = 'form-control mt-2';
                otherInput.placeholder = '직접 입력';
                otherInput.value = answers[question.id] === 'other' ? answers[question.id + '_other'] || '' : '';
                otherDiv.innerHTML = `
                    <input type="radio" name="q${question.id}" value="other" 
                        ${answers[question.id] === 'other' ? 'checked' : ''}>
                    <label class="ms-2">기타</label>
                `;
                otherDiv.appendChild(otherInput);
                otherDiv.onclick = () => {
                    answers[question.id] = 'other';
                    document.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
                    otherDiv.classList.add('selected');
                    otherInput.focus();
                };
                otherInput.oninput = (e) => {
                    answers[question.id + '_other'] = e.target.value;
                    updateNavigationButtons();
                };
                optionsElement.appendChild(otherDiv);
            }
            break;

        case 'checkbox':
            const checkboxGroup = document.createElement('div');
            checkboxGroup.className = 'checkbox-group';
            question.options.forEach(option => {
                const div = document.createElement('div');
                div.className = 'checkbox-option';
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'form-check-input';
                checkbox.value = option.value;
                checkbox.checked = (answers[question.id] || []).includes(option.value);
                checkbox.onchange = (e) => {
                    answers[question.id] = answers[question.id] || [];
                    if (e.target.checked) {
                        answers[question.id].push(option.value);
                    } else {
                        answers[question.id] = answers[question.id].filter(v => v !== option.value);
                    }
                    updateNavigationButtons();
                };
                const label = document.createElement('label');
                label.className = 'form-check-label ms-2';
                label.textContent = option.text;
                div.appendChild(checkbox);
                div.appendChild(label);
                checkboxGroup.appendChild(div);
            });
            optionsElement.appendChild(checkboxGroup);
            break;
    }

    updateNavigationButtons();
}
function getCurrentQuestion() {
    if (currentQuestion < questions.length) {
        return questions[currentQuestion];
    }
    
    const type = answers[2];
    const additionalQuestions = type === 'snake' ? snakeQuestions : horseQuestions;
    const questionIndex = currentQuestion - questions.length;
    
    return additionalQuestions[questionIndex];
}

function updateProgressBar() {
    const totalQuestions = questions.length + 
        (answers[2] === 'snake' ? snakeQuestions.length : horseQuestions.length);
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    document.querySelector('.progress-bar').style.width = `${progress}%`;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.disabled = currentQuestion === 0;
    
    const question = getCurrentQuestion();
    let hasAnswer = false;

    if (question.type === 'text') {
        hasAnswer = answers[question.id] && answers[question.id].trim() !== '';
    } else if (question.type === 'radio') {
        hasAnswer = answers[question.id] !== undefined;
        if (answers[question.id] === 'other') {
            hasAnswer = answers[question.id + '_other'] && answers[question.id + '_other'].trim() !== '';
        }
    } else if (question.type === 'checkbox') {
        hasAnswer = answers[question.id] && answers[question.id].length > 0;
    }

    nextBtn.disabled = !hasAnswer;
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function nextQuestion() {
    const totalQuestions = questions.length + 
        (answers[2] === 'snake' ? snakeQuestions.length : horseQuestions.length);
    
    if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
}

function shareResult() {
    const params = new URLSearchParams();
    for (let key in answers) {
        if (Array.isArray(answers[key])) {
            params.append(key, JSON.stringify(answers[key]));
        } else {
            params.append(key, answers[key]);
        }
    }
    
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
        alert('결과 링크가 복사되었습니다! 원하는 곳에 붙여넣기 하세요.');
    }).catch(() => {
        alert('링크 복사에 실패했습니다. 다시 시도해주세요.');
    });
}
function showResult() {
    document.getElementById('question-container').classList.add('d-none');
    document.getElementById('result').classList.remove('d-none');
    
    const resultContainer = document.getElementById('result-content');
    const characterImageContainer = document.querySelector('.character-image');
    const userName = answers[1];
    
    if (answers[2] === 'snake') {
        const snakeType = snakeTypes[answers[5] || 'other'];
        resultContainer.innerHTML = `
            <div class="text-center">
                <h3>${userName} 도토리의 2025년은 ${snakeType.type}과 함께!</h3>
                <p class="mt-4">${snakeType.description}</p>
                <div class="mt-4">
                    <h4>목표:</h4>
                    <p>${answers[3] === 'other' ? answers['3_other'] : 
                        snakeQuestions[0].options.find(opt => opt.value === answers[3])?.text || answers[3]}</p>
                    <h4>장애물:</h4>
                    <p>${answers[4] === 'other' ? answers['4_other'] : 
                        snakeQuestions[1].options.find(opt => opt.value === answers[4])?.text || answers[4]}</p>
                    <h4>무기:</h4>
                    <p>${answers[5] === 'other' ? answers['5_other'] : 
                        snakeQuestions[2].options.find(opt => opt.value === answers[5])?.text || answers[5]}</p>
                </div>
            </div>
        `;
        if (snakeType.image) {
            characterImageContainer.innerHTML = `<img src="${snakeType.image}" alt="${snakeType.type}">`;
        }
    } else {
        const horseColor = answers[5];
        const motto = answers[3];
        const achievements = formatCheckboxAnswers(answers[4]);
        const horseType = horseColors[horseColor];
        
        resultContainer.innerHTML = `
            <div class="text-center">
                <h3>${userName} 도토리의 2025년 말은 "${motto}"이에요.</h3>
                <p class="mt-4">이 말을 타고 이룰 것: ${achievements}</p>
                <p class="mt-4">${userName} 도토리는 "${motto}" 말을 타고 ${horseType.description}</p>
            </div>
        `;
        if (horseType.image) {
            characterImageContainer.innerHTML = `<img src="${horseType.image}" alt="${horseColor} horse">`;
        }
    }
}

function formatCheckboxAnswers(answerArray) {
    if (!Array.isArray(answerArray)) return '';
    const options = horseQuestions[1].options;
    return answerArray
        .map(value => options.find(opt => opt.value === value)?.text || value)
        .join(', ');
}

function restartTest() {
    currentQuestion = 0;
    answers = {};
    document.getElementById('result').classList.add('d-none');
    document.getElementById('intro').classList.remove('d-none');
}
// 페이지 로드 시 URL 파라미터 확인
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.size > 0) {
        // URL에 파라미터가 있으면 결과 페이지로 이동
        answers = {};
        for (let [key, value] of urlParams.entries()) {
            try {
                // 배열인 경우 파싱
                answers[key] = value.startsWith('[') ? JSON.parse(value) : value;
            } catch {
                answers[key] = value;
            }
        }
        showResult();
    }
};

function shareToKakao() {
    const resultContent = document.querySelector('#result-content h3')?.textContent || '나의 2025년 운세';
    const baseUrl = 'https://dotori-forest-make-2025puns.netlify.app';

    try {
        window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: '2025 도토리숲의 뱀과 말',
                description: resultContent,
                imageUrl: `${baseUrl}/images/snake-wave.png`,
                link: {
                    webUrl: baseUrl,
                    mobileWebUrl: baseUrl
                }
            },
            buttons: [
                {
                    title: '테스트 하러가기',
                    link: {
                        webUrl: baseUrl,
                        mobileWebUrl: baseUrl
                    }
                }
            ]
        });
    } catch (error) {
        console.error('카카오톡 공유 실패:', error);
        alert('카카오톡 공유에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
}