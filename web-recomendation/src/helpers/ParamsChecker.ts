const pageReg = /^\d{1,2}$/;

export const pageChecker = (page: string | null) => {
  if (!page) {
    return false;
  }
  if (!page.match(pageReg)) {
    return false;
  }

  return true;
};
