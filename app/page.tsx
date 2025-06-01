import CallToAction from "@/components/CallToAction";
import Module from "@/components/Module";
import ModuleList from "@/components/ModuleList";
import { recentSessions } from "@/constants";

import React from "react";

const Page = () => {
	return (
		<main>
			<h1> Popular Modules </h1>
			<section className='home-section'>
				<Module
					id='a9e9c6f6-1234-4f2e-a6c7-12ab34cd56ef'
					name='Introduction to AI'
					topic='Artificial Intelligence'
					subject='Computer Science'
					duration={45}
					color='#FF5733'
				/>

				<Module
					id='456'
					name='Quantum Physics Simplified'
					topic='Quantum Physics '
					subject='Physics'
					duration={60}
					color='#4CAF50'
				/>
				<Module
					id='789'
					name='Machine Learning Basics'
					topic='Machine Learning'
					subject='Computer Science'
					duration={30}
					color='#2196F3'
				/>
			</section>

			<section className='home-section'>
				<ModuleList
					title='Recently Completed Modules'
					modules={recentSessions}
					classNames='w-2/3 max-lg:w-full'
				/>
				<CallToAction />
			</section>
		</main>
	);
};

export default Page;
