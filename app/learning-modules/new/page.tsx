import ModuleForm from "@/components/ModuleForm";
import { newModulePermissions } from "@/lib/actions/module.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const NewLearningModule = async () => {
	const { userId } = await auth();
	if (!userId) redirect("/sign-in");

	const canCreateModule = await newModulePermissions();

	return (
		<main className='min-lg:w-1/3 min-md:w-2/3 flex items-center justify-center '>
			{canCreateModule ? (
				<article className='w-full gap-4 flex flex-col'>
					<h1 className='flex items-center justify-center'>Module Builder</h1>
					<ModuleForm />
				</article>
			) : (
				<article className='companion-limit'>
					<Image
						src='/images/limit.svg'
						alt='Module limit reached'
						width={360}
						height={230}
					/>
					<div className='cta-badge'>Upgrade your plan</div>
					<h1>You&apos;ve Reached Your Limit</h1>
					<p>
						You&apos;ve reached your companion limit. Upgrade to create more
						companions and premium features.
					</p>

					<Link
						href='/subscription'
						className='btn-primary w-full justify-center'>
						Upgrade My Plan
					</Link>
				</article>
			)}
		</main>
	);
};

export default NewLearningModule;
