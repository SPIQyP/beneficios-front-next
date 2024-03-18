'use client'
import { Button, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useState } from "react";

interface BenefitCardProps {
    id:string;
    title:string;
    description:string;
    startDate:string;
    endDate:string;
    termsAndConditions:string;
    isAuthenticated:boolean;
    userUid?:string;
    emailUser?:string | undefined;
}

const BenefitCard = ({id,title,description,startDate,endDate,termsAndConditions,isAuthenticated,userUid,emailUser}:BenefitCardProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [responseError,setResponseError] = useState('');
    const [modalError, setModalError] = useState(false);
    const [ticket, setTicket] = useState<any>({});

    const cuponRequest = async (benefitId:any) => {
        const response = await fetch("/api/cupon",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                benefitId:benefitId,
                userId:userUid,
                userEmail:emailUser
            })
        })


        const responseJson = await response.json();
        if (!responseJson.success) {
            setResponseError(responseJson.msg);
            setModalError(true);
            onOpen();

        } else {
            setTicket(responseJson.data)
            onOpen();

        } 
        
    }
    
    return(
        <>
        <div className="col-span-12 lg:col-span-8 text-black border p-8 rounded-lg mb-10">
            <div className="flex flex-col gap-4">
                <h3 className="text-4xl font-bold">{title}</h3>
                <p className="text-xl">{description}</p>
                <p>{`Disponible de : ${startDate} hasta ${endDate}`}</p>
                <p>{termsAndConditions}</p>
                <Link href={"/sign-in"} className={`btn w-fit text-white ${isAuthenticated ? 'hidden':'block'}`}>Iniciar session</Link>
                <Button className={`btn w-fit text-white ${isAuthenticated ? 'block':'hidden'}`} onClick={ () => cuponRequest(id)}>Solicitar cupon</Button>
            </div>
        </div>
        
        <Modal className="text-black" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">{modalError? 'Error al generar el cupon':'Cupon generado con exito'}</ModalHeader>
                <ModalBody>
                    <div className={`${modalError ? 'block': 'hidden'}`}>
                        <p className="text-rose-900"> 
                        {responseError}
                        </p>
                    </div>
                    <div className={`${modalError ? 'hidden':'block'} flex flex-col gap-4`}>
                        <h3 className="text-2xl font-bold">Codigo de cupon {ticket.code}</h3>
                        <p className="text-md">{ticket.benefitTitle}</p>
                        <p className="text-md">joser2014@gmail.com</p>
                        <p className="text-md">valido desde {ticket.startDate} hasta {ticket.endDate}</p>
                        <p className="text-md">terminos y condiciones</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" variant="light" onPress={onClose}>
                    Close
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
        </>
    )
}

export default BenefitCard;