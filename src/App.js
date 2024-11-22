import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';

function Home() {
  const navigate = useNavigate();
  
  return (
    <Container>
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Text Hip
        </Title>
        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          AI가 당신만의 특별한 시를 만들어드립니다
        </Subtitle>
        <StartButton
          onClick={() => navigate('/user-info')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          시 만들기 시하기
        </StartButton>
      </ContentWrapper>
    </Container>
  );
}

function UserInfo() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: '',
    mbti: '',
    loveExp: '',
    hobby: '',
    job: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    navigate('/loading', { state: { userInfo: userInfo } });
  };

  const mbtiOptions = ['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 
                      'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'];
  const loveExpOptions = ['모쏠', '1회', '2-3회', '4회 이상'];

  return (
    <Container>
      <UserInfoWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>당신에 대해 알려주세요</Title>
        
        <InputGroup>
          <Label>이름</Label>
          <Input 
            type="text" 
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            placeholder="이름을 입력해주세요" 
          />
        </InputGroup>

        <InputGroup>
          <Label>MBTI</Label>
          <SelectWrapper>
            {mbtiOptions.map((mbti) => (
              <RadioButton key={mbti}>
                <input 
                  type="radio" 
                  name="mbti" 
                  value={mbti}
                  checked={userInfo.mbti === mbti}
                  onChange={handleInputChange}
                />
                <span>{mbti}</span>
              </RadioButton>
            ))}
          </SelectWrapper>
        </InputGroup>

        <InputGroup>
          <Label>연애경험</Label>
          <SelectWrapper>
            {loveExpOptions.map((exp) => (
              <RadioButton key={exp}>
                <input 
                  type="radio" 
                  name="loveExp" 
                  value={exp}
                  checked={userInfo.loveExp === exp}
                  onChange={handleInputChange}
                />
                <span>{exp}</span>
              </RadioButton>
            ))}
          </SelectWrapper>
        </InputGroup>

        <InputGroup>
          <Label>취미</Label>
          <Input 
            type="text" 
            name="hobby"
            value={userInfo.hobby}
            onChange={handleInputChange}
            placeholder="취미를 입력해주세요" 
          />
        </InputGroup>

        <InputGroup>
          <Label>직업</Label>
          <Input 
            type="text" 
            name="job"
            value={userInfo.job}
            onChange={handleInputChange}
            placeholder="직업을 입력해주세요" 
          />
        </InputGroup>
      </UserInfoWrapper>

      <BottomButton
        onClick={handleSubmit}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        나에게 어울리는 시 만들기
      </BottomButton>
    </Container>
  );
}

function Loading() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  
  const userInfo = React.useMemo(() => location.state?.userInfo || {
    name: '사용자',
    mbti: '',
    loveExp: '',
    hobby: '',
    job: ''
  }, [location.state?.userInfo]);

  useEffect(() => {
    if (error) {
      console.log('Error occurred:', error);
    }
  }, [error]);

  useEffect(() => {
    const generatePoem = async () => {
      try {
        const response = await axios.post('/.netlify/functions/generate-poem', {
          messages: [{
            role: "user",
            content: `
다음은 대한민국에 SNS 시인으로 유명한 '하상욱' 시인의 작품들이야.
해당 작품들은 일상생활 속에서 느낄 수 있는 공감대나 해학적인 요소들을 많이 다뤄서 유머있게 시를 쓰는 시인으로 알려져있어.

레퍼런스 작품:
1. 예전엔좋은일 생기길 바랬다.요즘엔아무 일도 없기를 바란다.
2. 열정은 돈을 주고 살 수 없는데,돈을 안 주면 먹고살 수가 없더라.
3. "너는 충고를 나쁘게 듣더라""너는 기분 나쁘게 충고를 하더라"
4. 내일 월요일 인제 잠이 안 오는 게 아니라내일 월요일이라 잠이 안 오는 게 아닐까또 월요일이다. 죄지은 것도 없는데.
5. 평일 아침 : 금방 깨려 했는데 잔다휴일 아침 : 실컷 자려 했는데 깬다금요일 밤 : 졸리지만 자고 싶지 않아일요일 밤 : 자고 싶지만 졸리지 않아
6. 코끼리는 점프를 못하는 게 아니라점프할 필요가 없는 거야 필요가 없는 건데 능력이 없는 거래
7. 니 맘대로 생각해도 돼니 멋대로 떠들지만 마. 생각은 자유니까
8. '돈 안되는 거 뭐하러 할까?'라는남 걱정은 뭐하러 할까? 돈도 안되는데...
9. "그런 쓸데없는 생각 좀 하지 마" "어디 쓰려고 생각하는 거 아닌데"
10. 늦었다고 해서 할 수 없는 건 아니다 빨랐다고 해서 할 수 있는 게 아니듯. 믿어준다고 해서뭐든지 해낼 수 없지만 믿어주지 않으면무엇도 해낼 수가 없더라

위 레퍼런스를 참고하여, 다음 정보를 가진 사람의 특성을 반영한 짧은 시를 써줘:
- 이름: ${userInfo.name}
- MBTI: ${userInfo.mbti}
- 연애경험: ${userInfo.loveExp}
- 취미: ${userInfo.hobby}
- 직업: ${userInfo.job}

하상욱 시인의 스타일처럼 위트있고 공감가는 시를 작성해줘. 답변은 온전히 시만 제공해주고 어시스턴트 처럼 답변하면 절대 안돼`
          }]
        });

        console.log('Frontend Response:', response.data);

        if (response.data && response.data.content && response.data.content[0]?.text) {
          navigate('/result', { 
            state: { 
              poem: response.data.content[0].text,
              userInfo: userInfo 
            } 
          });
        } else {
          throw new Error('Invalid API response format');
        }

      } catch (error) {
        console.error('API Error:', error);
        setError(true);
        
        setTimeout(() => {
          const tempPoem = `
${userInfo.name}님의 MBTI ${userInfo.mbti}
차분하게 세상을 바라보는
당신의 마음이 예뻐서
사람들이 자꾸 기대어 오네요

하지만 때론 그게 무거워질 때도
그럴 땐 잠시 혼자만의 시간
그것도 참 좋은 거라네요

- Text Hip AI`;

          navigate('/result', { 
            state: { 
              poem: tempPoem,
              userInfo: userInfo 
            } 
          });
        }, 3000);
      }
    };

    generatePoem();
  }, [navigate, userInfo]);

  return (
    <Container>
      <LoadingWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LoadingText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {userInfo.name}님을 위한 멋진 시를 만들고 있어요..
        </LoadingText>
        <LoadingText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          잠시만 기다려주세요..
        </LoadingText>
        <Spinner
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </LoadingWrapper>
    </Container>
  );
}

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { poem, userInfo } = location.state || { poem: '', userInfo: { name: '사용자' } };

  return (
    <Container>
      <ResultWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
          {userInfo.name}님을 위한 특별한 시
        </Title>
        
        <PoemCard
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PoemText>{poem}</PoemText>
        </PoemCard>

        <ButtonGroup>
          <ActionButton
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            다시 시작하기
          </ActionButton>
          <ActionButton
            onClick={() => {/* 공유 기능 구현 */}}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ backgroundColor: '#4CAF50' }}
          >
            공유 하기
          </ActionButton>
        </ButtonGroup>
      </ResultWrapper>
    </Container>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f6f0ff 0%, #e3e3ff 100%);
`;

const ContentWrapper = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  color: #2d2d2d;
  margin-bottom: 1rem;
  font-weight: bold;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 2.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const StartButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #6c63ff;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #5a52d5;
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.6rem;
    font-size: 1rem;
  }
`;

const UserInfoWrapper = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  margin: 2rem auto;
  margin-bottom: 80px;
`;

const InputGroup = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
  color: #2d2d2d;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e3e3ff;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #6c63ff;
  }
`;

const SelectWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
`;

const RadioButton = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  input {
    display: none;
  }

  span {
    padding: 0.5rem 1rem;
    border: 2px solid #e3e3ff;
    border-radius: 20px;
    transition: all 0.3s;
    text-align: center;
    font-size: 0.9rem;
  }

  input:checked + span {
    background-color: #6c63ff;
    color: white;
    border-color: #6c63ff;
  }
`;

const BottomButton = styled(motion.button)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.2rem;
  background-color: #6c63ff;
  color: white;
  border: none;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
  }
`;

const LoadingWrapper = styled(motion.div)`
  text-align: center;
  padding: 2rem;
`;

const LoadingText = styled(motion.p)`
  font-size: 1.5rem;
  color: #2d2d2d;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Spinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 4px solid #e3e3ff;
  border-top: 4px solid #6c63ff;
  border-radius: 50%;
  margin: 2rem auto;
`;

const ResultWrapper = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  padding: 2rem;
  text-align: center;
`;

const PoemCard = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
  text-align: left;
`;

const PoemText = styled.pre`
  font-family: 'Pretendard', sans-serif;
  font-size: 1.2rem;
  line-height: 1.8;
  white-space: pre-wrap;
  color: #2d2d2d;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const ActionButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  background-color: #6c63ff;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.6rem;
    font-size: 1rem;
  }
`;

export default App;
