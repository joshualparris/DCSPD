import ModuleDetail from '../../../src/components/modules/ModuleDetail';
import { getModuleById } from '../../../src/data/modules';

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  const moduleData = getModuleById(params.moduleId);

  if (!moduleData) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Module not found</h1>
        <p className="mt-3 text-sm text-slate-600">
          This module id does not match the current module catalogue.
        </p>
      </div>
    );
  }

  return <ModuleDetail moduleData={moduleData} />;
}
