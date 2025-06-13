import CallToAction from "@/components/CallToAction";
import Module from "@/components/Module";
import ModuleList from "@/components/ModuleList";
// import { recentSessions } from "@/constants";
import { getAllModules, getRecentSessions } from "@/lib/actions/module.actions";
import { getSubjectColor } from "@/lib/utils";

import React from "react";

const Page = async () => {
	const modules = await getAllModules({ limit: 3 });
	const recentSessionsModules = await getRecentSessions(10);
	return (
		<main>
			<h1> Popular Modules </h1>
			<section className='home-section'>
				{modules.map((module) => (
					<Module
						key={module.id}
						{...module}
						color={getSubjectColor(module.subject)}
					/>
				))}
			</section>

			<section className='home-section'>
				<ModuleList
					title='Recently Completed Modules'
					modules={recentSessionsModules}
					classNames='w-2/3 max-lg:w-full'
				/>
				<CallToAction />
			</section>
		</main>
	);
};

export default Page;
