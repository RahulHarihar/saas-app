import CallToAction from "@/components/CallToAction";
import Module from "@/components/Module";
import ModuleList from "@/components/ModuleList";

import React from "react";

const Page = () => {
	return (
		<main>
			<h1> Popular Modules </h1>
			<section className='home-section'>
				<Module
					id='123'
					name='Neura the Brainly Explorer'
					topic='Neural Networks of the Brain'
					subject='Neuroscience'
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
				<ModuleList />
				<CallToAction />
			</section>
		</main>
	);
};

export default Page;
