"use client";

import { useState, useEffect } from "react";

// Função para calcular o tempo até a meia-noite
const getTimeUntilMidnight = () => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - now.getTime();
};

// Função para calcular o tempo até a próxima segunda-feira
const getTimeUntilNextMonday = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;

  const nextMonday = new Date(now);
  nextMonday.setDate(now.getDate() + daysUntilMonday);
  nextMonday.setHours(0, 0, 0, 0);

  return nextMonday.getTime() - now.getTime();
};

// Formata tempo até meia-noite (HH:MM:SS)
const formatTimeMidnight = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

// Formata tempo até segunda-feira (XdXhXm)
const formatTimeNextMonday = (milliseconds: number) => {
  const totalMinutes = Math.floor(milliseconds / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return `${days}d${hours}h${minutes}m`;
};

// Componente para contagem regressiva até meia-noite
export const MidnightCountdown = () => {
  const [timeToMidnight, setTimeToMidnight] = useState(getTimeUntilMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeToMidnight(getTimeUntilMidnight());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span>{formatTimeMidnight(timeToMidnight)}</span>;
};

// Componente para contagem regressiva até a próxima segunda-feira
export const NextMondayCountdown = () => {
  const [timeToNextMonday, setTimeToNextMonday] = useState(
    getTimeUntilNextMonday(),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeToNextMonday(getTimeUntilNextMonday());
    }, 60000); // Atualiza a cada minuto

    return () => clearInterval(interval);
  }, []);

  return <span>{formatTimeNextMonday(timeToNextMonday)}</span>;
};
