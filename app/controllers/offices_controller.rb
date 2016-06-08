class OfficesController < ApplicationController

  def create
    company = Company.find(params[:company_id])
    office_params = params[:office]
    params = office_params.merge({ company: company })

    form = CompanyForm::NewOfficeRow.new(params)

    if form.submit
      render json: { new_office: form.new_office }
    else 
      render json: { errors: form.errors }
    end
  end

  def update
    office = Office.find(params[:id])
    form = EditCompanyForm::EditOfficeRow.new(office)
    # it's not necessary to pass in the office object for this action, but the form is also used 
    # by the EditCompanyForm, which needs the office object.  not ideal

    if form.submit(params[:office])
      render json: { updated_office: form.office }
    else 
      render json: { errors: form.errors }
    end
  end

end