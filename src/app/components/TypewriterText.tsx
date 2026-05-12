import { useState, useEffect } from 'react';

const roles = [
  'Cybersecurity Expert',
  'AI Engineer',
  'Data Scientist',
  'Cloud Architect',
  'DevOps Professional',
  'Full Stack Developer',
];

export function TypewriterText() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length < currentRole.length) {
            setCurrentText(currentRole.slice(0, currentText.length + 1));
          } else {
            // Finished typing, wait then start deleting
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            // Finished deleting, move to next role
            setIsDeleting(false);
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentRoleIndex]);

  return (
    <span className="inline-block min-w-[300px]">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
