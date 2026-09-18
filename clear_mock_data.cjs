const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xdovsqzuedezkigyvxbv.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhkb3ZzcXp1ZWRlemtpZ3l2eGJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3Mzg4MTEsImV4cCI6MjEwMDMxNDgxMX0.rI2F37gh_jvxe7Mcn-9_MSD-H9p_4wyJh6DN_RQnbCU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function clearData() {
  console.log('Clearing mock data from Supabase...');
  
  // Remove existing audit records
  const { error: auditError } = await supabase
    .from("audit_events")
    .delete()
    .neq("id", "mock");

  console.log(
    "Audit events:",
    auditError ? auditError.message : "cleared successfully"
  );

  // Remove approval records
  const { error: approvalError } = await supabase
    .from("approvals")
    .delete()
    .neq("id", "mock");

  console.log(
    "Approvals:",
    approvalError ? approvalError.message : "cleared successfully"
  );

  // Remove registered agents
  const { error: agentError } = await supabase
    .from("agents")
    .delete()
    .neq("id", "mock");

  console.log(
    "Agents:",
    agentError ? agentError.message : "cleared successfully"
  );

  // Remove configured policies
  const { error: policyError } = await supabase
    .from("policies")
    .delete()
    .neq("id", "mock");

  console.log(
    "Policies:",
    policyError ? policyError.message : "cleared successfully"
  );

  console.log("Mock data cleanup completed.");
}
clearData();
