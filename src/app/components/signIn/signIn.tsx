'use client'
import { signInWithEmail, signInWithGoogle, signUpWithEmail } from "@/services/auth/auth.client";
import { Button, Divider, Image, Input, Link, Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const SignIn = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleRepass, setIsVisibleRepass] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading,setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] =  useState('')
    const formRef =  useRef<any>(null);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleVisibilityRepass = () => setIsVisibleRepass(!isVisibleRepass);
    const router = useRouter();

    const changeForm = (formSignUp:boolean) =>{
        setIsSignUp(formSignUp);
        setShowMessage(false);
        setMessage('');
    }

    const handleSignIn = async (authMethod:number) => {
        let isOk = false;
        switch(authMethod){
            case 1: {
                //Method Google
                isOk = await signInWithGoogle();
                if (isOk) router.push("/");
            }
            default:{

            }
        }
        
    };

    const handleForm = async (e:any) => {
        try{
            e.preventDefault();
            setLoading(true);
            setMessage('');
            setShowMessage(false)
            let isOk = false;
            const formData = new FormData(e.target);
            const formEntries:any =  Object.fromEntries(formData);
    
            if (formEntries['operation'] === 'signUp') {
    
                if (formEntries.password !== formEntries.repeatPasswrod) {
                    setMessage('Las contraseñas deben coincidir');
                    setShowMessage(true);
                    return 
                }
    
                isOk = await signUpWithEmail(formEntries.email,formEntries.password);
                
                if (isOk) {
                    setShowMessage(true);
                    setMessage('Se creo con exito su cuenta. Se envio un email para verificar su correo electronico');
                    setIsSignUp(false)
                    e.target.reset();
                }

            } else {
                isOk = await signInWithEmail(formEntries.email,formEntries.password);
                if (isOk) {
                    router.push("/");
                } else {
                    setMessage('Debe verificar su correo electronico para poder iniciar sesion');
                    setShowMessage(true);
                }
            }
        }catch(error:any){
            console.log(error.code)
            setShowMessage(true);
            setMessage(error.code);
        }finally{
            setLoading(false)
        }
        
        
    }

    return (
        <>
        <div>
            <p className={`text-xl font-bold text-primary text-center w-full ${isSignUp ? 'hidden':'block'}`}>Iniciar sesion</p>
            <p className={`text-xl font-bold text-primary text-center w-full ${isSignUp ? 'blocl':'hidden'}`}>Crear Cuenta</p>
            <form ref={formRef} onSubmit={handleForm}>
            <div className="flex flex-col gap-4 my-4 text-black">
                <Input className="hidden" type="text" name="operation"  value={`${isSignUp ? 'signUp' : 'login'}`}/>
                <Input type="email" label="Email" name="email" required/>
                <Input
                name="password"
                className="flex items-center"
                label="Password"
                variant="bordered"
                required
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <Image src="/img/icons/eye-slash.svg" alt="eye-view" width={24} height={24}/>
                    ) : (
                        <Image src="/img/icons/eye-view.svg" alt="eye-slash" width={24} height={24}/>
                    )}
                    </button>
                }
                type={isVisible ? "text" : "password"}
                />

                <Input
                className={`flex items-center ${isSignUp ? 'block' : 'hidden'}`}
                name="repeatPasswrod"
                label="Repita Password"
                variant="bordered"
                required
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibilityRepass}>
                    {isVisibleRepass ? (
                        <Image src="/img/icons/eye-slash.svg" alt="eye-view" width={24} height={24}/>
                    ) : (
                        <Image src="/img/icons/eye-view.svg" alt="eye-slash" width={24} height={24}/>
                    )}
                    </button>
                }
                type={isVisibleRepass ? "text" : "password"}
                />
                
                <Button className={`btn text-white ${isSignUp ? 'hidden': 'block'}`} type="submit">
                    <div className="flex items-center justify-center gap-3">
                        <Spinner className={`${loading ? 'block': 'hidden'}`} size="sm" color="white"/>
                        <span>Iniciar sesion</span>
                    </div>
                    
                </Button>
                <Button className={`btn text-white ${isSignUp ? 'block':'hidden'}`} type="submit">
                    <div className="flex items-center justify-center gap-3">
                        <Spinner className={`${loading ? 'block': 'hidden'}`} size="sm" color="white"/>
                        <span>Crear cuenta</span>
                    </div>
                </Button>
                <p className={`text-black text-center ${showMessage ? 'block':'hidden'}`}>{message}</p>
                <Button >¿Olvidaste tu contraseña?</Button>
                <Button type="reset" className={`${isSignUp ? 'hidden':'block'}`} onClick={() => changeForm(true)}>¿No tienes cuenta?</Button>
                <Button type="reset" className={`${isSignUp ? 'block' : 'hidden'}`} onClick={() => changeForm(false)}>Ya tengo cuenta</Button>
            </div>
            </form>
            <div className="grid grid-cols-12 justify-center items-center">
                <div className="col-span-4"><Divider></Divider></div>
                <div className="col-span-4 text-black text-center"><p>Ó on tus redes sociales</p></div>
                <div className="col-span-4"><Divider></Divider></div>
            </div>
            <div className="flex flex-col items-center mt-4 gap-4">
                <Button className="w-1/2 bg-transparent border border-black" startContent={<Image src="/img/icons/logo-google.svg" alt="google" width={24} height={24} />} onClick={x => {handleSignIn(1)}}>Iniciar sesion con Google</Button>
                <Button className="w-1/2 bg-transparent border border-black" startContent={<Image src="/img/icons/facebook-logo.svg" alt="google" width={24} height={24} />}>Iniciar sesion con Facebook</Button>
                <Button className="w-1/2 bg-transparent border border-black" startContent={<Image src="/img/icons/apple-logo.svg" alt="google" width={24} height={24} />}>Iniciar sesion con Apple</Button>
            </div>


        </div>
        </>
    )
}

export default SignIn;