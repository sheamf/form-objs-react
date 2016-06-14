class NewCompanyForm < CompanyForm

  attr_reader :company

  def persisted?
    false
  end

  def office_rows
    @office_rows ||= [NewOfficeRow.new] # uhhhh...
  end

  def persist!
    @company = Company.new(name: name, employee_count: employee_count)

    if @office_params.present?
      @office_rows.each do |office_row|
        office = office_row.persist!
        @company.offices << office
      end
    end

    @company.save!
  end

  def extract_params(params)
    super
    return unless @office_params.present?

    @office_rows = @office_params.map do |k, office_attrs|
      NewOfficeRow.new(office_attrs)
    end
  end

end