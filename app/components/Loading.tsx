import { motion } from "framer-motion";

const Loading = ({ hide = false }: { hide?: boolean }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        !hide && "page-height"
      }`}
    >
      <p className={`h1 mb-2 ${hide && "!hidden"} text-center text-red-500`}>
        yourHR
      </p>
      <div className="bg-gray-300 w-[300px] flex items-center h-0.5">
        <motion.div
          initial={{ x: -40 }}
          animate={{ x: 300 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="bg-red-500 h-1 w-[60px] rounded-full"
        />
      </div>
    </div>
  );
};

export default Loading;
