// 액션 타입
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

// 액션 생산자
export const increment = () => {
  return {
    type: INCREMENT
  };
};

export const decrement = () => {
  return {
    type: DECREMENT
  };
};
