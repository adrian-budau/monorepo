import Layout from "../../layout.tsx";
import {
	bundlesNestedAtom,
	projectAtom,
	selectedProjectPathAtom,
} from "../../state.ts";
import { useAtom } from "jotai";
import InlangBundle from "../../components/InlangBundle.tsx";
import { SlDialog, SlSpinner } from "@shoelace-style/shoelace/dist/react";
// import { InlangPatternEditor } from "../../components/SingleDiffBundle.tsx";
// import VariantHistory from "../../components/VariantHistory.tsx";
import VariantHistoryList from "../../components/VariantHistoryList.tsx";
import { useState } from "react";
import NoProjectView from "../../components/NoProjectView.tsx";
import { demoBundles } from "../../../demo/bundles.ts";
import { insertBundleNested } from "@inlang/sdk2";

// import VariantHistory from "../../components/VariantHistory.tsx";

export default function App() {
	const [project] = useAtom(projectAtom);
	const [selectedProjectPath] = useAtom(selectedProjectPathAtom);
	const [bundlesNested] = useAtom(bundlesNestedAtom);
	const [historyModalOpen, setHistoryModalOpen] = useState(false);
	const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
		null
	);

	const handleOpenHistoryModal = (variantId: string) => {
		setSelectedVariantId(variantId);
		setHistoryModalOpen(true);
	};

	const handleDemoImport = async () => {
		if (project) {
			for (const bundle of demoBundles) {
				await insertBundleNested(project.db, bundle);
			}
		}
	};

	// import demo data if no bundles are found
	if (project && selectedProjectPath && bundlesNested.length === 0) {
		handleDemoImport();
	}

	return (
		<>
			<Layout>
				{bundlesNested.length > 0 &&
					bundlesNested.map((bundle) => (
						<InlangBundle
							key={bundle.id}
							bundle={bundle}
							setShowHistory={handleOpenHistoryModal}
						/>
					))}
				{(!project || !selectedProjectPath) && <NoProjectView />}
				{project && selectedProjectPath && bundlesNested.length === 0 && (
					<div className="h-96 flex flex-col justify-center items-center gap-6">
						<p className="text-gray-500 text-lg">
							Import demo data
						</p>
						<SlSpinner />
					</div>
				)}
			</Layout>
			<SlDialog
				label="History"
				open={historyModalOpen}
				onSlRequestClose={() => {
					setHistoryModalOpen(false);
					setSelectedVariantId(null);
				}}
			>
				{selectedVariantId && (
					<VariantHistoryList
						variantId={selectedVariantId}
						setHistoryModalOpen={setHistoryModalOpen}
						setSelectedVariantId={setSelectedVariantId}
					/>
				)}
			</SlDialog>
		</>
	);
}