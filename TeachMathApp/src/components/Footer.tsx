

const Footer: React.FC = () => {

    return (
        <div className = "h-screen px-10 py-4 flex flex-col items-center gap-8 text-maindark  bg-gradient-to-t from-mainmid from-90% to-mainneutral">
            <div className = "flex flex-col items-center">
                <p>&copy; Iván Fernández López </p>
                <p className = "text-xs">Valladolid, Spain 2025</p>
            </div>
            <div className = "flex flex-col items-center text-myneutral font-extralight text-sm px-8">
                <p className = "text-center">Mas info sobre mi y sobre mas cosas y sobre muchisimas cosas 
                    y sobre el proyecto y sobre redes sociales y enlaces a ellas y sobre muchas cosas y sobre
                    como se ha trabajado y las referencias y todo y más.
                </p>
            </div>
        </div>
    );
};

export default Footer;