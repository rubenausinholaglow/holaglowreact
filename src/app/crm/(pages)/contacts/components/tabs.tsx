import React, { useState } from 'react';

interface TabsProps {
  tabs: any[];
  defaultTab: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex bg-gray-200 p-2 rounded m-4">
        {tabs.map(tab => (
          <button
            key={tab.label}
            onClick={() => handleTabClick(tab.label)}
            className={`${
              activeTab === tab.label
                ? 'bg-white text-gray-800'
                : 'bg-gray-200 text-gray-600'
            } px-4 py-2 mx-2 rounded-full focus:outline-none`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tabs.map(tab =>
          activeTab === tab.label && tab.component ? (
            <div key={tab}>{tab.component}</div>
          ) : null
        )}
      </div>
    </>
  );
};

export default Tabs;
