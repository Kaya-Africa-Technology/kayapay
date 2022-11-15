const businessInfoSchema = `
 CREATE TABLE IF NOT EXISTS tbl_kp_business_info(
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   name VARCHAR(100) NOT NULL,
   location VARCHAR(100) NULL,
   cac_no VARCHAR(10) NOT NULL UNIQUE,
   website VARCHAR(255) NULL,
   tax_no VARCHAR(15) NULL UNIQUE,
   email VARCHAR(255) NOT NULL UNIQUE,
   phone VARCHAR(15) NULL,
   "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
   "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
 )
`;

module.exports = businessInfoSchema
