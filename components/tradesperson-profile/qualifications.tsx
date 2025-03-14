'use client'
import { getQualifications } from "@/actions";
import { useEffect, useState } from "react";

interface QualificationProps {
    user: {
        id: string
    }
}

export default function Qualifications({user}: QualificationProps) {
    interface Qualification {
        id: string;
        qualificationTypeId: string;
        tradespersonId: string;
        issuingAuthority: string | null;
        dateIssued: Date | null;
        expiryDate: Date | null;
        verified: boolean;
    }

    const [qualifications, setQualifications] = useState<Qualification[]>([]);
    useEffect(() => {
        getQualifications(user.id).then((data) => {
            setQualifications(data)
        })
    }, [user.id])
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Qualifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {qualifications.map((qualification) => (
                    <div key={qualification.id} className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-bold">{qualification.verified}</h3>
                        <p>{qualification.issuingAuthority}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}