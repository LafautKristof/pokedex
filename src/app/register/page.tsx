import ProfessorOakBalloon from "@/components/ProfessorOak";
import RegisterForm from "@/components/RegisterForm";

const page = () => {
    return (
        <div>
            <RegisterForm />
            <ProfessorOakBalloon message="Create your account to start your Pokémon journey!" />
        </div>
    );
};
export default page;
