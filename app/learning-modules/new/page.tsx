import ModuleForm from "@/components/ModuleForm";

const NewLearningModule = () => {
	return (
		<main className='min-lg:w-1/3 min-md:w-2/3 flex items-center justify-center '>
			<article className='w-full gap-4 flex flex-col'>
				<h1 className='flex items-center justify-center'>Module Builder</h1>
				<ModuleForm />
			</article>
		</main>
	);
};

export default NewLearningModule;
