## react-timer-hook

React timer hook is a custom [react hook](https://reactjs.org/docs/hooks-intro.html), built to handle timers and countdown logic in your react component.

#### Note:

React hooks is available from react version 16.7.0-alpha

---

## Setup

`yarn add react-timer-hook` OR `npm install react-timer-hook`

---

## Example

```javascript
import React from 'react';
import useTimer  from 'react-timer-hook';

export default function App() {
  const now = new Date()
  const after10Days = now.setDate(now.getDate() + 10);
  const {
    seconds,
    minutes,
    hours,
    days,
    startTimer,
    stopTimer,
    resetTimer,
  } = useTimer({ autoStart: true });


  return (
    <div style={{textAlign: 'center'}}>
      <h1>react-timer-hook Demo</h1>
      <div style={{fontSize: '100px'}}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}
```

---

## Settings

| key | Type | Required | Description |
| --- | --- | --- | ---- |
| autoStart | boolean | No | if set to `true` timer will auto start |
| expiryTimestamp | number(timestamp) | No | if set a countdown timer will start, instead of normal timer |

---

## Values

| key | Type | Description |
| --- | --- | ---- |
| seconds | number | seconds value |
| minutes | number | minutes value |
| hours | number | hours value |
| days | number | days value |
| startTimer | function | function to be called to start timer |
| stopTimer | function | function to be called to stop timer |
| resetTimer | function | function to be called to reset timer, this reset will not make sense with countdown timer |
