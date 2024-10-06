import { Copy, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const Popup = () => {
  const [shortLinks, setShortLinks] = useState<string[]>([]);

  useEffect(() => {
    chrome.storage.local.get("shortLinks", (result) => {
      const storedLinks = result.shortLinks || [];
      setShortLinks(storedLinks);
    });
  }, []);

  const copyToClipboard = async (link: string) => {
    await navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  const openLink = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <div className="w-[400px] overflow-y-auto h-[500px] bg-[#1a1a1a] text-white flex flex-col gap-y-7">
      <Toaster richColors />
      <div className="sticky top-0 right-0 w-full bg-[#1a1a1a] p-4">
        <img
          src="https://cdn.dropp.cloud/s7kty4.png"
          alt="Logo"
          className="w-14"
        />
      </div>

      <div className="p-3">
        {shortLinks.length > 0 ? (
          <div className="flex flex-col gap-y-4">
            {shortLinks.map((link, index) => (
              <div
                key={index}
                className="flex items-center bg-white/10 p-2 justify-between"
              >
                <p className="text-lg">{link}</p>
                <div className="flex gap-x-3">
                  <button className="" onClick={() => copyToClipboard(link)}>
                    <Copy />
                  </button>
                  <button onClick={() => openLink(link)}>
                    <ExternalLink />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No short links saved.</p>
        )}
      </div>
    </div>
  );
};

export default Popup;
