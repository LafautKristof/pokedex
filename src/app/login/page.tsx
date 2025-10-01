import LoginForm from "@/components/LoginForm";
import ProfessorOakBalloon from "@/components/ProfessorOak";

const page = () => {
    return (
        <div>
            <LoginForm />
            <ProfessorOakBalloon message="Log in to catch, train and battle with your Pokémon!" />
        </div>
    );
};
export default page;
