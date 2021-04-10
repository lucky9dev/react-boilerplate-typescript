import { useState, useEffect, useRef } from 'react';
import { Time, Validate } from './utils';

export default function useTimer(settings) {
  const { expiryTimestamp: expiry, onExpire } = settings || {};
  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);
  const [seconds, setSeconds] = useState(Time.getSecondsFromExpiry(expiryTimestamp));
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef();

  function clearIntervalRef() {
    if (intervalRef.current) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }

  function handleExpire() {
    clearIntervalRef();
    Validate.onExpire(onExpire) && onExpire();
  }

  function start() {
    if (!intervalRef.current) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        const secondsValue = Time.getSecondsFromExpiry(expiryTimestamp);
        if (secondsValue <= 0) {
          handleExpire();
        }
        setSeconds(secondsValue);
      }, 1000);
    }
  }

  function pause() {
    clearIntervalRef();
  }

  function resume() {
    if (!intervalRef.current) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => setSeconds((prevSeconds) => {
        const secondsValue = prevSeconds - 1;
        if (secondsValue <= 0) {
          handleExpire();
        }
        return secondsValue;
      }), 1000);
    }
  }

  function restart(newExpiryTimestamp) {
    clearIntervalRef();
    setExpiryTimestamp(newExpiryTimestamp);
  }

  function handleExtraMilliSeconds(secondsValue, extraMilliSeconds) {
    setIsRunning(true);
    intervalRef.current = setTimeout(() => {
      const currentSeconds = Time.getSecondsFromExpiry(expiryTimestamp);
      setSeconds(currentSeconds);
      if (currentSeconds <= 0) {
        handleExpire();
      } else {
        intervalRef.current = undefined;
        start();
      }
    }, extraMilliSeconds);
  }

  useEffect(() => {
    if (Validate.expiryTimestamp(expiryTimestamp)) {
      const secondsValue = Time.getSecondsFromExpiry(expiryTimestamp);
      const extraMilliSeconds = Math.floor((secondsValue - Math.floor(secondsValue)) * 1000);
      setSeconds(secondsValue);
      if (extraMilliSeconds > 0) {
        handleExtraMilliSeconds(secondsValue, extraMilliSeconds);
      } else {
        start();
      }
    }
    return clearIntervalRef;
  }, [expiryTimestamp]);


  return {
    ...Time.getTimeFromSeconds(seconds), start, pause, resume, restart, isRunning,
  };
}
