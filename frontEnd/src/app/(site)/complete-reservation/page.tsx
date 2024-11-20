"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CompleteReservation from "@/components/CompleteReservation";

const CompleteReservationPage: React.FC = () => {
  return (
    <div>
      <CompleteReservation />
    </div>
  );
};

export default CompleteReservationPage;
