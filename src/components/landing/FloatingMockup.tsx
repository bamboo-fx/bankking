"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FloatingMockupProps {
  delay?: number;
  rotateX?: number;
  rotateY?: number;
  title: string;
  icon: LucideIcon;
  gradient: string;
}

export function FloatingMockup({ delay = 0, rotateX = -10, rotateY = 15, title, icon: Icon, gradient }: FloatingMockupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: 0, rotateY: 0 }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX,
        rotateY,
      }}
      transition={{
        delay,
        duration: 0.8,
        type: "spring",
        stiffness: 50
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      className="relative"
    >
      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Card className="w-80 h-48 bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 shadow-2xl p-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-xl`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-xs text-slate-500 font-medium uppercase">{title}</div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-slate-200 rounded-full w-full"></div>
              <div className="h-3 bg-slate-200 rounded-full w-4/5"></div>
              <div className="h-3 bg-slate-200 rounded-full w-3/5"></div>
            </div>
            <div className="mt-4 flex gap-2">
              <div className="h-8 w-20 bg-blue-500/20 rounded-lg"></div>
              <div className="h-8 w-20 bg-blue-500/20 rounded-lg"></div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
