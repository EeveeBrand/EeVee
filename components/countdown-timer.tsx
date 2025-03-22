"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CountdownTimerProps {
  targetDate: Date
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours.toString().padStart(2, "0") },
    { label: "Minutes", value: timeLeft.minutes.toString().padStart(2, "0") },
    { label: "Seconds", value: timeLeft.seconds.toString().padStart(2, "0") },
  ]

  return (
    <div className="flex space-x-4">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex flex-col items-center">
          <motion.div
            className="text-4xl font-bold bg-background p-3 min-w-[70px] text-center rounded-md relative overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div
              key={unit.value}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {unit.value}
            </motion.div>
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-primary"
              initial={{ width: 0 }}
              animate={{ width: unit.label === "Seconds" ? "100%" : "0%" }}
              transition={{
                duration: unit.label === "Seconds" ? 1 : 0,
                repeat: unit.label === "Seconds" ? Number.POSITIVE_INFINITY : 0,
                repeatType: "loop",
              }}
            />
          </motion.div>
          <span className="text-sm text-muted-foreground mt-2">{unit.label}</span>
        </div>
      ))}
    </div>
  )
}

