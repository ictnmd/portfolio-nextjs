'use client';

import { BookOpen, Briefcase, Users, BadgeCheck, Trophy } from 'lucide-react';

interface EducationItem {
	title: string;
	period: string;
	description: string[];
}

interface ExperienceItem {
	title: string;
	period: string;
	description: string;
	Team_size?: string;
	role?: string;
	contribution?: string[];
	main_tech?: string;
}

interface AwardItem {
	title: string;
	period: string;
	description: string;
}

interface ResumeProps {
	education: EducationItem[];
	experience: ExperienceItem[];
	awards: AwardItem[];
}

export function Resume({ education, experience, awards }: ResumeProps) {

	return (
		<article className="bg-background-secondary border border-border rounded-xl p-6 shadow-md">
			<header className="mb-8">
				<h1 className="text-2xl font-semibold text-text-secondary mb-2">Resume</h1>
				<div className="w-8 h-1 bg-gradient-primary rounded" />
			</header>

			{/* Education */}
			<section className="mb-10">
				<div className="flex items-center gap-4 mb-6">
					<div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
						<BookOpen className="w-6 h-6 text-primary" />
					</div>
					<h3 className="text-lg font-medium text-text-secondary">Education</h3>
				</div>

				<div className="relative ml-6">
					<div className="absolute left-0 top-0 w-0.5 h-full bg-border" />
					<div className="space-y-6">
						{education.map((edu, idx) => (
							<div
								key={idx}
								className="relative"
							>
								<div className="absolute -left-2 top-2 w-2 h-2 bg-gradient-primary rounded-full border-2 border-background-secondary" />
								<div className="ml-4">
									<h4 className="text-primary font-medium mb-1">{edu.title}</h4>
									<span className="text-text-secondary text-sm mb-3 block">{edu.period}</span>
									<ul className="list-disc list-outside pl-5 space-y-1 text-text-muted text-sm">
										{edu.description.map((line, i) => (
											<li key={i}>{line}</li>
										))}
									</ul>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
				{/* Awards */}
				<section>
				<div className="flex items-center gap-4 mb-6">
					<div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
						<Trophy className="w-6 h-6 text-primary" />
					</div>
					<h3 className="text-lg font-medium text-text-secondary">Awards & Recognition</h3>
				</div>

				<div className="space-y-4">
					{awards.map((award, index) => (
						<div
							key={index}
							className="bg-background-tertiary/40 border border-border rounded-lg p-5"
						>
							<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
								<div>
									<h4 className="text-secondary font-medium">{award.title}</h4>
									<span className="text-text-secondary text-sm">{award.period}</span>
								</div>
								<div className="flex items-center gap-1">
									<Trophy className="w-4 h-4 text-primary" />
								</div>
							</div>
							<p className="text-text-muted text-sm leading-relaxed mt-3">{award.description}</p>
						</div>
					))}
				</div>
			</section>

			{/* Experience */}
			<section className="mb-10">
				<div className="flex items-center gap-4 mb-6">
					<div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
						<Briefcase className="w-6 h-6 text-primary" />
					</div>
					<h3 className="text-lg font-medium text-text-secondary">Experience</h3>
				</div>

				<div className="space-y-6">
					{experience.map((item, index) => (
						<div
							key={index}
							className="bg-background-tertiary/40 border border-border rounded-lg p-5"
						>
							<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
								<div>
									<h4 className="text-secondary font-medium">{item.title}</h4>
									<span className="text-text-secondary text-sm">{item.period}</span>
								</div>
								<div className="flex flex-wrap items-center gap-2">
									{item.role && (
										<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-border text-xs text-text-muted">
											<BadgeCheck className="w-3 h-3 text-primary" /> {item.role}
										</span>
									)}
									{item.Team_size && (
										<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-border text-xs text-text-muted">
											<Users className="w-3 h-3 text-primary" /> Team {item.Team_size}
										</span>
									)}
								</div>
							</div>

							<p className="text-text-muted text-sm leading-relaxed mt-3">{item.description}</p>

							{item.contribution && item.contribution.length > 0 && (
								<div className="mt-4">
									<h5 className="text-primary text-sm font-medium mb-2">Key Contributions</h5>
									<ul className="list-disc list-outside pl-5 space-y-1 text-text-muted text-sm">
										{item.contribution.map((c, i) => (
											<li key={i}>{c}</li>
										))}
									</ul>
								</div>
							)}

							{item.main_tech && (
								<div className="mt-4 pt-4 border-t border-border">
									<div className="flex flex-wrap gap-2">
										{item.main_tech.split(',').map((t) => {
											const tech = t.trim();
											return (
												<span key={tech} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-border text-xs text-primary bg-background-secondary/50">
													{tech}
												</span>
											);
										})}
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</section>

			
		</article>
	);
}
